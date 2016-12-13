---
layout: post
title: Bulk Upload Mailgun Suppressions CSV
---

This is just another one of those posts summarizing some time I wasted so hopefully someone else won't waste theirs.

If you have a big list of suppressions (emails of users who unsubscribed, marked you as spam, etc) from another email provider (eg Sendgrid) and want to import them into Mailgun, there's no easy way to do it.  The web UI doesn't seem to have a way and their SDKs don't support it yet.

Their API, however, does.  Here's a little ruby script that will read a sendgrid csv and upload all the emails to mailgun as suppressions (in this case "complaints", which are the equivalent of sendgrid's "spam" list emails).
<!--break-->
```
require 'csv'
require 'net/http'
require 'json'

# Stuff you should probably set
@domain = 'mail.example.com' # Your mailgun domain
@suppression_type = 'complaints' # one of: complaints, bounces, or unsubscribes
@auth_key = 'key-01da0f1f68e13e62b2b252ef8051d0fa' # Your mailgun api key
@csv = '/users/you/Desktop/suppression_spam_reports.csv' # Location of the csv

# Stuff you probably don't need to mess with
HOST = 'api.mailgun.net'
PORT = 443

@http = Net::HTTP.new(HOST, PORT)
@http.use_ssl = true

def upload(emails)
  request = Net::HTTP::Post.new("/v3/#{@domain}/#{@suppression_type}", { 'Content-Type': 'application/json' })
  request.basic_auth 'api', @auth_key
  request.body = emails.map do |email|
    { address: email }
  end.to_json
  response = @http.request(request)
end

# Skip the first line of the csv (it's just headers) and then grab the second
# item on each row.
emails = CSV
  .foreach(@csv)
  .drop(1)
  .map do |row|
  row[1]
end

puts "starting"
upload(emails)
puts "Done uploading #{emails.count} emails"
```
