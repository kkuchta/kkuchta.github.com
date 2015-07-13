---
layout: post
title: Wallopics Is Dead
---

## TLDR

[Wallopics.com](http://wallopics.com) is broken.  Imgur decided to start blocking it.  It won't be coming back.  If you still want to use it, you can download [this html file](https://raw.githubusercontent.com/kkuchta/RandomImagur2/master/index.html) and open it in a browser.
<!--break-->

## What was wallopics?

Wallopics.com was a simple little JS site I build a while back.  It was an infinitely scrolling mosiac wall of pictures.  Each picture was randomly pulled from imgur.com by guessing imgur urls (`i.imgur.com/XXXXX.jpg`) until it found one that worked.

I thought it was kinda cool.  It was a fun little JS project to give me a bit more experience with Backbone.js (this was several years ago).

Other people thoguht it was pretty cool too.  It was a hit on [reddit](http://www.reddit.com/r/InternetIsBeautiful/comments/1k7tms/infinite_wall_of_truly_random_imgur/).  When I finally got around to adding google analytics to it almost a year and a half after I released it, I was still getting a few hundred hits per day.  Even now, after it's been defunct for a couple months, it's still the top google result for "random imgur".

## Death and Tech Support

About two months ago, I checked google analytics for the site (as I did every few weeks) and noticed a significant decline in traffic.  I checked the site and found that it was no longer working- no images would load!

A few quick minutes of debugging revealed that any image requests with wallopics.com as a referer were being rejected by imgur:

```
$ curl --referer 'wallopics.com' -I http://i.imgur.com/1lhTi.jpg
HTTP/1.1 403 Forbidden

$ curl --referer 'notwallopics.com' -I http://i.imgur.com/1lhTi.jpg
HTTP/1.1 200 OK
```

Since that's pretty clearly Imgur taking a direct step against my site specifically, I decided to try to get in touch with their support staff.  As far as I knew, imgur was pretty cool with hotlinking from their site, so I couldn't be violating any of their terms of service, right?

Their response was:

> Thanks for writing. Unfortunately your site has been blocked from hotlinking because it violates our user's privacy. We offer private image uploading and want our users to feel secure knowing that no one can find an image without the direct link. I'm very sorry for the confusion. Please let me know if I can help further.

Now, of course, this is pretty thoroughly ridiculous.  If your image can be found by guessing a url, it's not particularly private.  At this point, I didn't expect that arguing would get me anywhere, and I wasn't about to try to circumvent the block just to prove a point.  I did feel compelled to try to politely point out that it wouldn't be hard to do so, and that this might not be a wise long-term strategy for them.  Their response was:

> Thanks for the info! We've just recently started cracking down on referrers, so we'll definitely take that into consideration. But we make a distinction between private and secret images. An image can never be secret, but any privately uploaded image can only be accessed by going to the direct link - even if you guess it! Here's an article that explains this further: https://help.imgur.com/hc/en-us/articles/201746817-Image-and-album-privacy-explained-. Have a great weekend!

Now, I can understand where Imgur's coming from.  They want to be able to offer private image-hosting for users such that users can still share those images with their friends without needing cumbersome access controls and logins for everyone involved.  Security through obscurity, with all the pros and cons associated with that.

Unfortunately, they don't *actually* offer that service.  Their urls *are* easily guessable.  Anyone with a minimal amount of programing knowledge (or even just a web browser and the patience to guess a few urls by hand) can access "private" images.

## What I could do

There are a few options I could pursue to circumvent this block:

1. A proxy-server that strips the referer would make it work again pretty easily.  Wallopics.com would request images from proxy.wallopics.com, which would pass the request on to imgur with no referer.  Imgur might counter that with an IP block, but that can be addressed other ways.
2. I could host the page on some popular domain (eg `https://s3-us-west-1.amazonaws.com/some_bucket/index.html`).  Imgur couldn't block that domain as a referer- aws is too widely used.  They might try to block that bucket name, but I could rotate through bucket names easily enough.  Wallopics.com would just always redirect to the latest bucket.
3. I could distribute this as an app (desktop or otherwise) that people run themselves.

In reality, I'm not going to bypass Imgur's wishes just to be a jerk.  However, I'm not the only one running a random imgur site.  A search for 'random imgur' turns up a dozen other options with slightly worse UIs.  I'm sure at least one of those won't be as nice.

## What Imgur should do

Guids.  Imgur urls (at least the ones I'm checking) are 5-digits.  If you pick a 5-digit alphanumeric imgur url, you have about a 45% chance to hit an image.  That number drops precipitously if you use a 6-digit code.  If imgur were to use a full-on guid like `imgur.com/0df12896-d854-4deb-b659-0b55b75f08ea` for their 'private' images, it would be astronomically impossible to find even one real image by chance.  Heck, even an 8-digit code would make a browsable site like mine impractical.

## What you can do

If you still want to use my infinite wall of imgur pics, the code has always been available on [github](https://github.com/kkuchta/RandomImagur2).  If you're too lazy to mess with frontend build tools (and I would hardly blame you), [here's a compiled single html file](https://raw.githubusercontent.com/kkuchta/RandomImagur2/master/index.html) that you can download to get the full wallopics experience yourself.
