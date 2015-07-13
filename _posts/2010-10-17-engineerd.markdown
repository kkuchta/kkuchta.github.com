---
layout: post
title: Engineer'd
mt_id: 17
date: 2010-10-17 22:52:03.000000000 -07:00
---
I'm sick of Facebook's liking system.  I can see their idea, but it's become complete crap.  99% of "likes" that show up in my feed are either thoroughly inane our outright malicious (seriously, I never thought I'd see this much clickjacking in the wild).
<!--break-->

So, here's a prototype of a script to remove them from the front page:

**Edit:** Newer version, now with 50% less fail (lots of false positives).

	var likeRegex = /.*likes <a.*/;
	var timerFct = function(){
		$(".storyContent").filter(function(){
			console.log(2);
			return likeRegex.test( $(this).html() );
		}).hide();
		setTimeout(timerFct,10000);
	}
	setTimeout(timerFct,3000);

It's meant as part of a chrome plugin- once I package it as such (assuming there's no pitfalls there- haven't tried it yet), I'll post it here.  For you firefox users, throw it into Greasemonkey and you should be good.

To be clear, this is not guaranteed to work.  The regex will hit plenty of false positives, and I'll refine this if I get around to it later.

**Edit**: Chrome extension.  Works for me- let me know if you have trouble: <a href="http://kevinkuchta.webfactional.com/blog/fbdeliker_1_0/fbdeliker.crx">fbdeliker.crx</a> 
