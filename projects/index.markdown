---
layout: page
---
# Projects

## [UnexpectedHamilton](https://twitter.com/suddenhamilton) <span class='github'>[[github]](https://github.com/kkuchta/lyric_bot)</span>

A ruby twitterbot for detecting partial song lyrics and tweeting the next few lines.  Eg if you tweet "I took my shot," it might detect that as a match to the line "Not throwing away my shot" from the musical Hamilton.  The bot would then tweet the following lines from Hamilton: "Hey yo, I'm just like my country / I'm young, scrappy and hungry."

It matches base on line endings.  It weights each matching word based on how common the word is (so a match of "and me" is scored lower than a match of "extra marsupials"), and considers the tweet + lyric a match if the weighted score is over a configurable threshold.

## Bub <span class='github'>[[github]](https://github.com/kkuchta/bub)</span>

A ruby slackbot for claiming and deploying to heroku servers.  My company has a handful of heroku boxes we use for staging new features + doing acceptance test on them.  Since several new features may be in progress at once, the devs were constantly asking "Is sassy free?" (sassy being the name of one of the staging servers).  This is a slackbot I wrote to manage claiming and releasing servers.

I also recently added the ability to actually deploy github branches to heroku through bub.

Although this is used by Joyable, it's a personal project- I've strictly separated my work on this from my employer, using personal time and machines, so I can show it off here.

<hr>

## [KevinKuchta.com](http://www.kevinkuchta.com) <span class='github'>[[github]](https://github.com/kkuchta/kkuchta.github.com)</span>

Included here for completeness, this is a generated static Jekyll-based site hosted on github pages.  I've added in Haml for the html and Sass for the css, along with Jekyll's built-in markdown parsing for the content.  I started from a bootstrap base, but the visible design and css are my own.  I'm debating whether to keep the faux-bold headings- my more design-oriented friends say they're crap- I'm mixed on it.

<hr>

## Toy Projects

Smaller and/or less-practical things

### [Baller JS Physics Engine](https://github.com/kkuchta/physicsengine)

I wanted to play around with canvas, so I drew a ball.  Then I made it move.  Then I thought the movement should be more realistic, and it spiraled from there.  Before I realized it, I had general-purpose forces like gravity and friction, and I was working on collision resolution.  It only ever dealt with balls, of course, but it was fun.

<hr class="divider">

# Graveyard

### [Wall of Imgur (potentially NSFW)](http://random-imgur.s3-website-us-east-1.amazonaws.com/) <span class='github'>[[Github]](https://github.com/kkuchta/RandomImagur2)</span>

This is pretty silly- it's just a wall of random images from Imgur.com (an image-hosting site).  It has infinite scrolling, zoom-hover (which was a little tricky to make work nicely without covering the page and whatnot), semi-intelligent tiling, and a mode that replaces all the images with kittens.  That last one is because, since these are truly random images, some of them are occasionally NSFW and I wanted to be able to be able to work on this in public places.

August 2013: I recently started a job using coffeescript and backbone.  To refamiliarize myself with these, I rebuild the wall of imgur in with them.

May 2015: Wall of Imgur (renamed to wallopics.com) was quite popular on reddit.  Then, eventually, Imgur decided to shut it down by blocking wallopics.com as a referrer.  See the [writeup](/_site/2015/05/wallopics-is-dead/) for more details.  Moving this to the graveyard, but you can still user the compiled site on [github raw](finished site).

<hr>

## [Vimbits.com](http://www.vimbits.com) <span class='github'>[[github]](https://github.com/kkuchta/Vimbits)</span>

A site to upvote and downvote your favorite Vim configuration snippets.  Made with Bootstrap and Rails (decided to keep it largely js-free for v1).  Hit the HN front page twice, and got about 12k uniques in the first week or so.  It's leveled off to around 80 uniques a day.  It needs a lot of visual work and some bug fixes, but mostly it needs better features to support wading through the mass of noise to find the gems: duplicate detection, a moderation queue/interface, real searching, better tagging, etc.

This is probably my most popular project to date.  Unfortunately, I kinda outgrew it.  It's on a really old version of rails and written pretty poorly.  I built it before I was a full-time rails dev, and so I contravened a *lot* of best practices.  Predictably, it became a maintainability nightmare.  Since there also isn't a whole lot it can teach me anymore, I let it quietly die.

## Rayne, aka ShitIbuilt.com

This was intended to be a competitor to Linkedin that was focused on "Shit I Built".  It addressed the problem that although I have a bunch of friends, I can't really vouch for many of them as good programmers/designers/marketers/whatever, as I just haven't worked with them.  This was meant to be an 'anti-social network' where the key link was not friendship or acquaintance, but shared projects.

Rayne (our internal name) died on the vine as we became less convinced that we had the interest to make it happen.  We built a minimum product, but the 'viable' part was not really there: an idea that simple really needed a lot more polish than we had the time to give it (and we weren't nearly confident enough about the idea to go full-time on it).  The remnants of it can be found at [http://shitibuilt.com/](http://shitibuilt.com/) or directly on [heroku](http://quiet-rain-7455.herokuapp.com/), although that link will probably die eventually.
<hr>

## [Ubimenu.com](http://www.ubimenu.com/)

A tool for restaurants and bars to have a simple mobile webapp with no coding experience required.  I worked on the frontend stuff: the welcome page, the admin panel, and a bit of the mobile js.  We ended up getting a few paying customers at the high point.

This died for a couple reasons:

1. It required too much sales work- there was no organic growth.  The other guy involved (my roommate at the time) had to talk to restaurants individually, and that wasn't that scalable unless we wanted to bet the farm on this and do it full time (we weren't).
2. By the time this started to mature, there were plenty of tools out there filling this niche already (as well as fancy features like online ordering and native apps).

<hr>

## [Canton](https://github.com/kkuchta/canton)

**Update:** Grunt does pretty much everything I was doing here, but better, so I'm moving this project to the graveyard.

Canton (based on "domaine de canton" from my roommate's liquor collection) is a simple framework that's growing out of my various javascript experiments.  Each time I make a frontend-only project to play around with, I find myself with a similar set of wants:

- Optionally use fun tools: sass, coffeescript, haml
- Have assets automatically regenerate as needed
- Compile everything to a single html file I can easily copy to a friend or slap on S3 for hosting.

So, I use sinatra and a few plugins to get the fun tool stack and auto regeneration during development.  Then, for fun, I wrote a rake task to compile everything into one file (including external links like CDN stuff).  The todo list includes a lot of cleanup- maybe bundle it all into a gem or something so it's more of a tool than a template.


## [SFRentalApp](http://www.sfrentalapp.com) <span class='github'>[[github]](https://github.com/kkuchta/amaretto)</span>

This was just a simple 'scratch my own itch' site.  I was applying for apartments and it was surprisingly difficult to find a basic common rental application.  So, I built one myself.  It's just a flatfile js page that looks like a printed form (and some of the interface disappears when you actually print it).  I used it as an excuse to play with coffeescript some more, so it has kind of an overbuilt class structure, but I had fun with it.  :)

