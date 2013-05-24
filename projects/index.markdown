---
layout: page
---
# Projects

## [Vimbits.com](http://www.vimbits.com) <span class='github'>[[github]](https://github.com/kkuchta/Vimbits)</span>

A site to upvote and downvote your favorite Vim configuration snippets.  Made with Bootstrap and Rails (decided to keep it largely js-free for v1).  Hit the HN front page twice, and got about 12k uniques in the first week or so.  It's levelled off to around 80 uniques a day.  It needs a lot of visual work and some bug fixes, but mostly it needs better features to support wading through the mass of noise to find the gems: duplicate detection, a moderation queue/interface, real searching, better tagging, etc.
<hr>

## [KevinKuchta.com](http://www.kevinkuchta.com) <span class='github'>[[github]](https://github.com/kkuchta/kkuchta.github.com)</span>

Included here for completeness, this is a generated static Jekyll-based site hosted on github pages.  I've added in Haml for the html and Sass for the css, along with Jekyll's built-in markdown parsing for the content.  I started from a bootstrap base, but the visible design and css are my own.  I'm debating whether to keep the faux-bold headings- my more design-oriented friends say they're crap- I'm mixed on it.

<hr>

## [SFRentalApp](http://www.sfrentalapp.com) <span class='github'>[[github]](https://github.com/kkuchta/amaretto)</span>

This was just a simple 'scratch my own itch' site.  I was applying for appartments and it was surprisingly difficult to find a basic common rental application.  So, I built one myself.  It's just a flatfile js page that looks like a printed form (and some of the interface disappears when you actually print it).  I used it as an excuse to play with coffeescript some more, so it has kind of an overbuilt class structure, but I had fun with it.  :)

<hr>

## [Canton](https://github.com/kkuchta/canton)

Canton (based on "domaine de canton" from my roommate's liquor collection) is a simple framework that's growing out of my various javascript experiments.  Each time I make a frontend-only project to play around with, I find myself with a similar set of wants:

- Optionally use fun tools: sass, coffeescript, haml
- Have assets automatically regenerate as needed
- Compile everything to a single html file I can easily copy to a friend or slap on S3 for hosting.

So, I use sinatra and a few plugins to get the fun tool stack and auto regeneration during development.  Then, for fun, I wrote a rake task to compile everything into one file (including external links like CDN stuff).  The todo list include a lot of cleanup- maybe bundle it all into a gem or something so it's more of a tool than a template.

<hr>

## Toy Projects

Smaller and/or less-practical things

### [Baller JS Physics Engine](https://github.com/kkuchta/physicsengine)

I wanted to play around with canvas, so I drew a ball.  Then I made it move.  Then I thought the movement should be more realistic, and it spiralled from there.  Before I realized it, I had general-purpose forces like gravity and friction, and I was working on collision resolution.  It only ever dealt with balls, of course, but it was fun.

### [Wall of Imgur (potentially NSFW)](https://github.com/kkuchta/kahlua) <span class='github'>[[Github]](http://safe-forest-6414.herokuapp.com/)</span>

This is pretty silly- it's just a wall of random images from Imgur.com (an image-hosting site).  It has infinite scrolling, zoom-hover (which was a little tricky to make work nicely without covering the page and whatnot), semi-intelligent tiling, and a mode that replaces all the images with kittens.  That last one is because, since these are truly random images, some of them are occasionally NSFW and I wanted to be able to be able to work on this in public places.

<hr class="divider">

# Graveyard

## Rayne, aka ShitIbuilt.com

This was intended to be a competitor to Linkedin that was focused on "Shit I Built".  It addressed the problem that although I have a bunch of friends, I can't really vouch for many of them as good programmers/designers/marketers/whatever, as I just haven't worked with them.  This was meant to be an 'anti-social network' where the key link was not friendship or aquaintence, but shared projects.

Rayne (our internal name) died on the vine as we became less convinced that we had the interest to make it happen.  We built a minimum product, but the 'viable' part was not really there: an idea that simple really needed a lot more polish than we had the time to give it (and we weren't nearly confident enough about the idea to go full-time on it).  The remenants of it can be found at [http://shitibuilt.com/](http://shitibuilt.com/) or directly on [heroku](http://quiet-rain-7455.herokuapp.com/), although that link will probably die eventually.

## [Ubimenu.com](http://www.ubimenu.com/)

A tool for restaurants and bars to have a simple mobile webapp with no coding experience required.  I worked on the frontend stuff: the welcome page, the admin panel, and a bit of the mobile js.  We ended up getting a few paying customers at the high point.

This died for a couple reasons:

1. It required too much sales work- there was no organic growth.  The other guy involved (my roommate at the time) had to talk to restaurants individually, and that wasn't that scallable unless we wanted to bet the farm on this and do it full time (we weren't).
2. By the time this started to mature, there were plenty of tools out there filling this niche already (as well as fancy features like online ordering and native apps).
