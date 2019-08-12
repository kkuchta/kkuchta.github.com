---
layout: page
---
# Silly Hacks
In my professional life, I tend to stick to clear, non-clever code.  So when I go home at night, I write terrible things.  Here are some of them.

## [CSS-Only Chat](https://github.com/kkuchta/css-only-chat) <span class='github'>[[github]](https://github.com/kkuchta/css-only-chat)</span>

Writing an asynchronous web-based chat system is pretty easy with modern tooling:
a bit of javascript on the frontend and a bit of logic on the backend.

This project is a truly monstrous async web chat using no JS whatsoever on the frontend whatsoever.  It works by abusing the http protocol (chunked transfer encoding) to send data to the frontend and abuses CSS background images + pseudoselectors to send data back.  See the github for a gif-demo and a full technical writeup.

This was, surprisingly to me, by far the most popular thing I've ever built.

## [Ruby is the best Javascript](/2017/07/disguising-ruby-as-javascript/) <span class='github'>[[talk]](https://www.youtube.com/watch?v=datDkio1AXM)</span>

Ruby has very a flexible syntax and powerful metaprogramming tools. In a display of complete moral depravity, I've abused those features to make valid Ruby code that's indistinguishable from Javascript.  There are a bunch of clever and terrible tricks in this, which I elaborated on in my talk at the [2019 RubyConf](https://www.youtube.com/watch?v=datDkio1AXM).

## [Kmk.Party](/2018/03/lambda-only-url-shortener/) <span class='github'>[[github]](https://github.com/kkuchta/url_shortener)</span>

A url-shortener with Lambda &ndash; JUST Lambda.  This is not intended to be used - it's a massive abuse of AWS's Lambda service.  If you know lambda, you know how ridiculous this is.  If not, well... Lambda is a very specific kind of hammer that's extremely good at hammering a very specific kind of nail.  This project proves it's possible to use that hammer to drive a wing-nut into silly putty if you swing hard enough and are willing to get messy.

If you're here looking for tech stacks, this is all Python (although admittedly it's more Python than I've written in the last decade before this).

<span id="totes-not-amazon" />
## [Totes Not Amazon](https://totes-not-amazon.com) <span class='github'>[[github]](https://github.com/kkuchta/aws_markov)</span>

AWS's product announcements are sometimes a bit hard to read through all the proprietary names and terms - they feel like they could have been written by a markov chain.  [So I built that](https://totes-not-amazon.com)!  A ruby script scrapes all 3k+ aws announcement posts, then a python script creates a markov chain model from that.  Then more python uses that to generate posts + titles on demand and feeds them to some js which inserts them into a page that looks just like an amazon announcement.

It's hosted, of course, all on AWS.  Lambda & ApiGateway for the post generation + cloudfront for caching/routing + S3 for static files and route53 for dns.
