---
layout: post
title: CSS-Only Chat
---

So, it turns out that css background-images don't get loaded until the relevant selector is triggered.

Many people might say "neat!"

I used it to build a bi-directional CSS-only async chat.

<!--break-->

For some background, it's not hard to build a multi-directional web-based chat.  It's practically the "Hello World" of Node.JS.  A bit of JS on the frontend, a bit of logic on the backend and you're off to the races.

This thing I built does that with _no_ frontend javascript whatsoever.  Just html and javascript.  The trick turns out to be abusing the http protocol and some fun properties of CSS.

A full technical writeup and a quick gif-demo can be found [on github](https://github.com/kkuchta/css-only-chat).

Building this was an interesting experience for me.  It started (like most of my favorite projects do) as a "what if...".  Someone retweeed this [davywtf tweet](https://twitter.com/davywtf/status/1124130932573839360) on using CSS pseudoselectors to send data to a server from a page with javascript disabled.  That got me thinking: if it's possible to send nearly-arbitrary data like that, you should be able to build something like a full chat out of it.  Once I came up with a way to send data back to the frontend (using long-running http requests), it was clear it was possible.

I was (and still am, as of this writing) taking the summer off to travel after leaving my last gig (we got acquired, I wasn't wild about the acquirer).  As a result, I had this idea while in a position to spend as much time as I wanted on it.  It turned out I needed a couple afternoons in a Paris cafe to get the core pieces in place and then another afternoon polishing + writing it up.  I waited until morning, US time, and tweeted about it.

I was unprepared for the level of response I'd get.

I've always been pretty bad at predicting how popular the things I create will be.  [My AWS markov chain](/2018/08/totes-not-amazon/) went nowhere; [My blockchain comic](https://twitter.com/kkuchta/status/983740731234729986/photo/1) went mildly viral.  My [wikivoyage explorer]( https://github.com/kkuchta/voyagefound ) has interested exactly no one, but my [ruby js nonsense](/2017/07/disguising-ruby-as-javascript/) has done pretty well (even becoming a [RubyConf talk](https://www.youtube.com/watch?v=datDkio1AXM)).  Who knows what will stick when I throw it against the wall?

Anyway, this chat abomination became a wild success.  Top of hacker news for a good chunk of the day; tripling my twitter follower count; 5k stars on github.  Old acquaintances reached out when they recognized my name and friends told me when coworkers posted it in their work slacks.

I credit the success of this to:

- Easy to understand.  The [tweet](https://twitter.com/kkuchta/status/1125789539530956801) explains the whole concept and the demo gif shows it off in just a few seconds.
- Inherently click-baity title "CSS-only async chat" seems inherently impossible until you read the article.
- The underlying content is actually interesting.  It's a legitimately clever hack (if I do say so myself).
- Wide pool of devs it's relevant to.  When I do something intense in ruby, only the ruby community cares.  The pool of "devs who've done a bit of web work" is much, much larger.
- Putting my twitter handle in the gif.  This thing got reblogged and reuploaded all over the place, often with minimal explicit credit.  But since no content aggregator is going to recreate that gif, every one of them credited me anyway.
- Putting the writeup on github, rather than my blog.  That domain has a fair deal of credibility: when you see a github link, you have a pretty good idea of what you're going to get vs some random dude's blog.
- Writeup voice.  This is something I've been working on: trying to make my writeups interesting and funny.  I've been going for self-deprecating ("What inspired this? Chernobyl, Hindenburg, The Tacoma Narrows Bridge...") and just a bit abrasive ("Why's your code suck? Why do you suck?").  The number of people who commented on the writeup (specifically the humorous FAQ at the end) was surprising.

The moderately-popular things I've built before have tended to die out after a day or two in the sun.  Even the blockchain comic petered out after something like 3 days.  This CSS thing went on for a solid couple of weeks.  I'd be watching BSG on my ipad weeks later and I'd have to silence twitter notifications so that new follower notifications don't keep interrupting me.

I'm now writing this three months after the fact and I think I can official call it "over."  The last twitter notification I got for someone liking that tweet was 5 days ago.  I figured it was time to finally write about it a bit.

Looking back on it, I'll definitely admit that the attention was fun.  Maybe I'll try to relive it at some point by turning it into a conference talk.

The best aspect of all this, though, is that I now have 3 moderately-successful hacks (ruby-as-js, totes-not-aws, and this).  That constitutes a pattern.  I'm starting to become known as "that guy who does the horrible/clever things."  I'm pretty happy about that.  Maybe that trend will continue.
