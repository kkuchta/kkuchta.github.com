---
layout: post
title: !binary |-
  RnVsU3RhY2s=
mt_id: 13
date: 2010-03-21 14:59:22.000000000 -07:00
---
###What is it?
FulStack is a web-based tool to manage social media advertising campaigns.  There are plenty of tools out there that let you post to facebook, twitter, etc from one interface, but there's really no tool that lets you easily schedule and manage a succession of posts over a long period of time; FulStack aims to fix that.

From a technical perspective, it's a Rails app that interfaces with APIs from various social media sites.  It's being built by two developers ([Chris 'Cap' Tosswill](http://tosswill.net/) and myself), with design work by [Meghan Manders](http://meghanmanders.com/).

###Where'd it come from?
Cap, Meghan, and I participated in [RIT48](http://rit48.com), a business/code-athon in which a bunch of teams tried to put together a web business (code, design, business plan, etc) in two days.  FulStack was the product of that, and won seconds place.  As a fun side note, first place got $600 split 5 ways, but since we had only 3 people, our $400 meant we got more money per person anyway!  :)

###What'd you work on?
I did the integration with the APIs.  We got Facebook, Twitter, LinkedIn, and Tumblr working, but only had time to integrate Twitter and Tumblr by the judging.

###What next?
We want to push this business idea, since there seems to be a fair deal of interest among the social media experts that have heard about this idea.  Then again, those guys get excited about everything, so who knows how much need there actually is for this service.

Anyway, the next step technically is to clean up a lot of code that was written in that very rushed 48 hours.  I want to turn our message-sending daemon into a simple cron job, and cap wants to clean up the UI.  We both have jobs, classes, and all sorts of other commitments, but we hope to get to a beta in a few weeks. 
