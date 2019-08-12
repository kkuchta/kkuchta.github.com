---
layout: post
title: Senior Project
mt_id: 19
date: 2011-02-01 01:16:32.000000000 -08:00
---
### What is it?
"Senior Project" is the capstone class in the RIT Software Engineering program.  It's a 6-month project on a team of 4-5 SEs working for an external client on a real problem.  In my case, I'm working with 4 other seniors ([Chris Tosswill](http://tosswill.net), [Matt Olenik](http://mattolenik.net/), Bernard Stern, and Pete Bergeron; our sponsor is Eastman Kodak.
<!--break-->

What we're developing is a Facebook collage generator.  The flow is like this:

1. Select photos from your Facebook albums (using combinations of manual selection and intelligent suggestions).
2. View a generated, "interesting" collage containing those photos.  Manipulate the photos in it by rotating, resizing, cropping, etc in your browser as you see fit.
3. Generate a high-res version of the collage to post to your wall, save, or print using Kodak's fulfillment services.

### Sounds too easy...

I'll admit that on its face, it's not too bad.  The fun comes in the stretch goals.

The "intelligent suggestions" for photos can be anything from photos with similar metadata to the ones you've already selected (eg, the same people tagged in them) to photos with similar color characteristics (involving some image processing) to photos with similar subjects (involving image understanding).

The "interesting" collage generation is also non-trivial.  There are a lot of algorithms out there we can use- some are largely arbitrary, and some use understanding of the image content.  We may also build off of a [previous Kodak-RIT senior project](http://www.se.rit.edu/~photorganize).

### So, how are you working this?

I'm glad you asked.  Check out this snazzy architecture diagram I threw together for our interim presentation:

<img alt="Architecture.png" src="http://kevinkuchta.webfactional.com/blog/SeniorProject/Architecture.png" width="419" height="531" class="mt-image-none" style="" />

### What are you doing on it?

I'm working the rails/facebook end of things.  There are two of us on the Rails end, two of us on the .Net end, and one guy handling most of the Javascrip UI stuff (although there's overlap all over the place).

### What about the non-technical aspects?

This being a capstone project, a visible process methodology is reasonably important.  We're going with Scrum.  Our department advises against this, since the project requirements are reasonably known in advance.

Our first counterargument is that while the requirements are stable, there's still a lot of risk.  None of us have done OpenCV before, which is what we're using for a lot of the image manipulation and understanding.  There's minimal team experience with the Facebook API (outside of my experience with FulStack last year).  Further, Facebook likes to change both its API and it's TOS without warning and pretty frequently.  There's enough stuff that can change that we want to have an agile process that allows for a structured reaction to change.

Our second counter-argument is that we have a sponsor requirement for rapid feedback and high customer visibility- that is, we need to have working products in their hands early and often.  Agile methodologies, as well as some general evolutionary ones, serve that purpose pretty well.

Further, since we need (according to department-enforced senior project rules) to follow a specific, known methodology, we went with one of the better known agile ones: Scrum. 
