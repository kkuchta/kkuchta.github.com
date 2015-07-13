---
layout: post
title: Facebook iFrame Authorization
mt_id: 20
date: 2011-02-01 01:18:31.000000000 -08:00
---
So, it turns out that any facebook page, when loaded in an iframe, will explode. That is, it'll display the facebook logo and nothing else. It'd say it's an anti-clickjacking measure, if I had to guess.
<!--break-->

The problem is that this applies to /any/ iframe, including facebook's own. This presents a problem when trying to load facebook's authorization page in a facebook iframe-based app. This was a problem as of Jan 1, 2011, but facebook changes things so fast that it may be resolved by now. If not, here's how to fix it.

#### How it should work:

1. User loads apps.facebook.com/myapp, which loads myserver.com/fb_content/start in an iframe, which, upon detecting that the user has not authorized the app, will redirect to-
2. Facebook's authorization page (still in the iframe).  If the user clicks "Allow", it'll redirect to whatever url you passed in the redirect, such as-
3. myserver.com/fb_content/cool_authorized/stuff (still in the iframe)

Of course, as stated, step 2 blows up.

#### How to make it work
1. User loades apps.facebook.com/myapp, which loads myserver.com/fb_content/start in an iframe, which, upon detecting that the user has not authorized the app, will *javascript* redirect (busting out of the frame) to:
2. Facebook's authorization page (*not* in an iframe).  If the user clicks "Allow", it'll redirect to the url passed, which gets you back to-
3. myserver.com/fb_content/start (*not* in an iframe), since facebook authorization won't redirect to a domain that's not yours (eg, can't do apps.facebook.com), so you need to first redirect to a page you control, detect that you're not in an iframe, and so redirect to-
3. apps.facebook.com/myapp, which loads myserver.com/fb_content/start in an iframe, which, upon detecting that the user *has* authorized your app, will redirect to-
5. myserver.com/fb_content/cool_authorized/stuff (still in the iframe)

Luckily, this all looks like "How it should work" to the user if the redirects are fast.

#### Rails code to do it

In app/controllers/oauth_controller:

	def start
		require 'uri'
		escaped_callback_url = URI.escape(FB_CONFIG['callback_url'], Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
		signed_request_data = decode_signed_request(FB_CONFIG['app_secret'],params[:signed_request])
	
		if(signed_request_data)
			if(signed_request_data["user_id"] != nil)
				# User has already or just accepted the app
				session['auth_token'] = signed_request_data['oauth_token']
				redirect_to "wherever you want to go after authentication"
			else
				# User hasn't accepted our app
				@redirect_url = "https://graph.facebook.com/oauth/authorize?client_id=#{FB_CONFIG['app_id']}&redirect_uri=#{escaped_callback_url}&display=page&scope=publish_stream,user_photo_video_tags&type=user_agent&display=page"
			end
		else		
			#We're not in a facebook iframe
			redirect_to FB_CONFIG['app_url']
		end
	end
	
	private
		require 'base64'
		def base64_url_decode(str)
		  str += '=' * (4 - str.length.modulo(4))
		  Base64.decode64(str.gsub("-", "+").gsub("_", "/"))
		end
		
		require 'hmac-sha2'
		# used to validate signed requests from facebook http://developers.facebook.com/docs/authentication/canvas
		def decode_signed_request(facebook_secret, signed_request)
			if(signed_request==nil)
				return nil
			end
			if(facebook_secret==nil)
				raise "Facebook secret not set."
			end
		  encoded_sig, encoded_data = signed_request.split(".")
		  decoded_data = base64_url_decode(encoded_data)
		  decoded_sig = base64_url_decode(encoded_sig)
			logger.info "Decoded data = " + decoded_data.inspect
			logger.info "Json parsed decoded data = " + ActiveSupport::JSON.decode(decoded_data).inspect
			expected_sig = HMAC::SHA256.digest(facebook_secret, encoded_data)
		  return decoded_sig==expected_sig ? ActiveSupport::JSON.decode(decoded_data) : nil
		end
		
In app/views/oauth:

	<% if @redirect_url %>
		<script type='text/javascript'>top.location.href = '<%= raw @redirect_url %>';</script>
	<% end %>
	
In config/initializers/load_config:

	FB_CONFIG = YAML.load_file("#{RAILS_ROOT}/config/facebook.yml")[RAILS_ENV]
	
In config/facebook.yml:

	production:
	    app_id: '1234your_app_id'
	    api_key: '1234your_app_key'
	    app_secret: '1234your_app_secret'
	    callback_url: "myserver.com/fb_content/start"
	    app_url: http://apps.facebook.com/myapp
	
In Gemfile:

	gem 'json'
	gem 'ruby-hmac' 
