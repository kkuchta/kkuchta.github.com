---
layout: post
title: Autotune the Project
mt_id: 11
date: 2010-02-04 20:18:04.000000000 -08:00
---
###Hell is shiny objects
I don't know about you, but I often suffer from a lack of motivation on personal projects.  Usually it goes something like this:

1.    Be sitting at my computer and thing "Hey, I've got a half hour; I could try to fix that bug in the FPA event model." <!--break-->
2.    Launch Textmate, open the relevant directory in it, and wait for that to load.
3.    Launch MAMP and wait for it to spool up it's isolated MySQL and Apache servers
5.    Start up the Fixx issue tracker server and wait for that to load.
4.    Go to the production and staging sites for reference, and wait for those to load
6.    Go to the site on localhost, as well as the bug tracker page, and wait for those to load.
7.    Open Cyberduck (my sftp client of choice) and wait for it to load + make it's connection
8.    Load up the terminal and navigate to the right directory
9.    Switch back to Textmate and get to work.

Of course there's usually some point in there where, while waiting for something to load, I get distracted.  Stumbleupon is just a keystroke or two away.  Cmd-T, Ctrl-Shift-S and I'm reading about baby elephants in Asia.  30 minutes later, I'm out of time, and no work got done.

While this isn't a huge problem when I'm being payed to work or any project that I'm working on for large contiguous blocks of time, it used to come up all time with personal projects.  Further, even without the distraction factor, the amount of effort required to get down to work can be off-putting.  Once I'm working, I'm focused like a racehorse (assuming racehorses are really focused- I really have no idea).  Getting to that point can be an issue, though.

###Make the robot do it
We automate every other aspect of our projects, why not this?  Continuous integration severs, build scripts, unit tests- we script our way past any monotonous task, so how 'bout setup?

I have one button on my dock to load up all the tools I need to code, run, test, and deploy my work for [SPDB](http://www.kevinkuchta.com/blog/projects/SPDB), and slightly less involved but increasingly automated processes for my other tool-intensive projects.  These tend to be some amalgomation of Automator, AppleScript, and Bash.  They're not especially elegant, but they're not ment to be- spending too much time developing tools to organize tools to do actual work starts bogging down your ability to actually do work.

###Time is an illusion
Like most labor-saving labor, this seemed like more work than it was worth right up until I started using it.  That seems to be a common theme on automation- ever heard any of these?

*    "Automated Unit testing takes too much time to write- time we could use to develop"
*    "Version Control is too much effort to be worth the small amount of time it save."
*    "We don't need to script our deployment process- we don't do it /that/ often."

But once these tasks are completed, you immediately start to see the benefit.  Saving even 30 to 60 seconds every time I launch my dev environment setup script builds up pretty fast.

###Housing Prices
Automating a task is like buying a house.  Before that, you're just renting.  Every month you pay your rent, and have nothing to show for it other than living in your flat for that month.  Every time you do a task by hand, you pay the time it takes and have nothing to show for it other than completing it once.

When you buy a house, you start building equity.  Yes, you had an up-front cost, but now every house payment is building up benefit to you, instead of just being thrown away.  Likewise, a scripted task takes time to set up up front, but thereafter saves you time every time you do that task at a fraction of the effort.

Further, what's more fun- launching, spooling, loading and opening?  Or just coding?

Whenever and whereever it's practical: automate it.  It's usually worth the time.
 
