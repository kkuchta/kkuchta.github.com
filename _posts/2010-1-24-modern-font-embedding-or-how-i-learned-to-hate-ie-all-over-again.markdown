---
layout: post
title: Modern Font Embedding or How I learned to hate IE all over again
mt_id: 9
date: 2010-01-24 15:41:52.000000000 -08:00
---

** Note: This post is so out of date as to be useless.  Ignore it! **
<!--break-->

###A New Hope

Since the dawn of time, man has yearned for full control of fonts on his website.  For many years, though, we've been stuck using just the fonts that we can reliably expect every user to have installed on their machines.

However, hope has come at last; no longer must we toil in typographic mediocrity.  As of summer-ish of 2009, most major browsers (Safari, Firefox, IE) support it (in anticipation of the CSS 3.0 spec).  We are now free from the shackles of conformist font faces!

Given all this, I decided to have a go of playing with embedded fonts on www.kevinkuchta.com.  It's easy, what could go wrong?

###Fail and You
Of course, it's not that simple (it never is).  IE's been doing font embedding since it was put in the CSS 2.0 specification (then subsequently removed in CSS 2.1).  As such, they do it entirely different from everyone else (and, for that matter, the spec).

There are plenty of other references on [font embedding ](http://www.qodo.co.uk/blog/re-introducing-font-face-css-rules/), but I thought I'd focus specifically on the weird things IE does, since that's what's been giving me some fun headaches.  Hopefully this will save some people some trouble in the future.

###Things IE Doesn't do

####Multiple Font Sources
 In an ideal world, your font list could look something like this:

    src: url("/fonts/HelNuBold.ttf"), url("/fonts/HelNuBold.eot")

If any given source failed for whatever reason, it'd fail over to the next on on the list, and this is exactly what Firefox et. al will do.  IE, on the other hand, will fail entirely if it sees multiple source declarations on one line like that.  It tries to load the font entitled: ``"/fonts/HelNuBold.ttf"), url("/fonts/HelNuBold.eot"``

####Local Font Sources
Ideally, you could declare a font-face that would look first to a local source:

    src: local("Helvetica Neue Italic")

This would be especially useful in conjunction with multiple font sources.  IE doesn't like the "local" syntax, though, and will ignore a line with local in it.  This is actually useful if you want to set up a source list that IE will ignore, but Firefox et al. will read.

####Font Weights
Some fonts have different actual font files for bold text- it'd be nice if we could set up a set of fonts to automatically switch to the correct font whenever a section of text in a certain embedded font was bolded.  It'd work something like this:

    @font-face{
        font-family: "somefont";
        src: "url("/fonts/HelveticaNeueBold.ttf")"
        font-weight: 700;
    }
    @font-face{
        font-family: "somefont";
        src: "url("/fonts/HelveticaNeueRegular.ttf")"
        font-weight: 400;
    }
    
This is even more useful when dealing with a font (like Helvetica Neue) that has half a dozen different font-weights, from UltraLight to Black.  Of course, true to form, IE fails and Firefox/Safari work fine.  What's interesting about this one, though, is that it fails non-deterministically.  It will decide to render bold/regular fonts with random fonts, weights, and variously condensed/expanded.

It makes for a cool party trick to switch fonts randomly on different reloads from static css/html.  If you have access to IE, you can check out a [live demo](http://www.kevinkuchta.com/ietest-static/ftest.html), in which I've assigned several very different fonts to the same font-family but different font-weights; try reloading a few times.  If you don't have IE, you can see the effect using the excellent IE testing tool [Netrender](http://ipinfo.info/netrenderer/index.php) and reloading a few times.

####Font Styles
Very similar to how you'd use font-weights- italicized text would automatically use the italicized font, rather than just being slanted by some browser algorithm.  It'd look like:

    @font-face{
        font-family: "somefont";
        src: "url("/fonts/HelveticaNeueRegular.ttf")"
        font-style: normal;
    }
    @font-face{
        font-family: "somefont";
        src: "url("/fonts/HelveticaNeueItalic.ttf")"
        font-style: italic;
    }

But, of course, IE reacts non-deterministically to this.  Firefox/Safari work fine.

####TTFs
  Everyone's gotta have their own font format, of course.  Firefox/Safari take, among others, .ttf (TrueType Font) files, whereas IE takes .eot "Embedded Open Type" files.  The technical differences between these two are a topic for another post, but for the purposes of embedding, they can be treated the same.  For those starting out with ttf's or otf's, I cannot recommend highly enough the font generator by [Font Squirrel](http://www.fontsquirrel.com/fontface/generator).  It'll output the necessary eot's as well as the correct CSS to work in both IE and Firefox.

<div class="metapost">'Cause I got mad styles / I got money in piles.  This web shizzle is rockin' some mad minimalistic style.  I'm a fan of minimalism in webdesign because, well, it's harder for me to screw up.  Clean lines and lots of whitespace.  Anyway, we now have a much prettier site.  I've killed a lot of the default Moveable Type widgets and played around with a those that are left.  I also spent a lot of time trying to get the typography right (or at least the way I want it- I'm not a graphics designer), and had some fun with IE (for certain values of 'fun').</div> 
