---
layout: post
title: Catcher's Mitt- A Simple Tool To Print Http Requests
---

The other day I released [Mitt](https://github.com/kkuchta/mitt), a simple tool that listens for http connections on a specified port and prints out requests to stdout.
<!--break-->

There are other ways to accomplish this– hell, a [10-line rackup file](https://gist.github.com/kkuchta/f3b78f3c490fb132ee2eac245d4fd04a) will do the same thing.  But if *I* had this need, I'll bet at least a few other people do too.  To that end, I expanded that rackup script into a ruby gem and published it (with a bit of cleanup and a few more options).

Honestly, I'm a bit surprised this tool didn't exist already.  I keep expecting someone to tell me "Oh yeah, you can do that by just piping `foo` through `xargs` and `netcat`".  I haven't found a tool like this yet, though, so maybe I really am the first to package it up like this.

The use case for me, at least, has been testing out infrastructure stuff.  I was messing around with the [elk stack](https://www.elastic.co/webinars/introduction-elk-stack) last month at work and I regularly found myself trying to determine whether requests were making it between servers (and containers) or not.  By telling some service to point to my laptop running something like Mitt instead of logstash, I could tell whether the log lines were actually getting sent (we were sending over https instead of with syslog for reasons not worth getting into).

Then later that month I found myself working on a slack bot that wasn't handling a webhook properly.  Since the webhook request was coming through an ssh tunnel to my laptop, the issue could have been a problem with my slack configuration, a problem with the tunnel, or a problem with my code.  Running mitt let me eliminate the first two options by confirming that requests _were_ making it to my laptop.

So- it's a bit of a niche tool, but it's dead simple.  `mitt 8080` listens on port 8080.  `mitt 8080 foobar` listens on port 8080 and returns `foobar` in the response body to all http requests (if your requester expects a specific body for some reason).  I'm hoping it's so simple that no documentation is necessary (although there is some anyway).

Here's hoping that this little tool is useful to someone else besides me, although I had fun writing it regardless.
