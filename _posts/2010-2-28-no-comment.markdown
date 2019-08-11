---
layout: post
title: No Comment
mt_id: 12
date: 2010-02-28
---
Much like throwing a kitten into a pit of rottweilers, there are a few questions you can throw into any group of developers that'll have them at each other's throats in moments.  One fun one I discovered recently was:
<!--break-->

"When do you comment?"

Most opinions I've seen have fallen into one of a few categories:

1. Real men don't need comments
2. The code should be self-documenting
3. Comment on design decisions (the 'whys' of code blocks)
4. Comment on the what blocks of code are doing (the 'whats' of code blocks)
5. COMMENT EVERYTHING!!!!1!!1ONE11!1!!

Few reasonable people hold position 5, and the people holding position 1 aren't likely to turn away from their [RPC-4000](http://www.pbm.com/~lindahl/mel.html) to care what some wet-behind-the-ears, object-oriented, virtualizing, abstracting, greenhorn youngin' like me has to say.

#### Self Documenting Code ####
The general argument is that clear method/parameter/variable/etc names, clean well-formatted code, and well structured source are sufficient for the sort of low-level documentation you see.

The Pros are pretty clear- less commenting means less stuff to keep up to date and in sync with the code.

> Commenting just makes the source file twice as long.

However, no one is perfect.  Your code is never ultimately well structured, named, and formatted.  If you think it is and I have to deal with your code later, I want to track you down and light your face on fire.  Unless you're the perfect lovechild of Steve McConnell and Erich Gamma, then your naming, structure, and formatting will be incomplete, and I will hate you.  You're better off assuming you suck and commenting as such.

#### Comment on design decisions ####
The idea here is that you'd comment on how a method or block of code fits in with the rest of system.  Obviously you don't want a complete design document in the comments for every method, but you might want to point out specific gotcha's and the code's general role in the system.

The Pro's to this are that it helps someone going through the code understand the possible ramifications of changes, especially if they're non-obvious.

The problem with this approach is that it's hard to keep up to date.  That's true of any documentation, but comments are supposed to be the closest thing to the code itself.  Comments that reflect not just changes to the code at hand but also the rest of the system are difficult to keep current.  If code in modules A, B, and C all discuss what module D does (in relation to how they interact with it), then they all have to be updated when module D is changed or repurposed.

#### Comment on function ####
Pretty simple - comment on what a block of code or method does.  You see this formalized in Javadocs.

The main argument against this tact is that it should be unnecessary.  Programmers can read code, why do we need text to tell us what code does?

I would argue that we don't want to take the time to read your code and figure out what it does.  If I'm skimming through a dozen foreign thousand-line class files, I don't want to have to read every line in them just to find the one block that modifies X; it'd be nice to be able to skim through comments to find "//This section deals with X."

In another case, your code may just be too dense to be read quickly.  I can figure out what your line-noise regex does, but unless you deal with it constantly it'll take a minute- it'd save me some time if you took 20 seconds to give dense code a brief description.  The same can go for any unusually clever or cryptic piece of code: yes I can read it, but I'm looking at this source to find information, not marvel at how clever you thought you could be.

#### Whaddaya say?
So which style's best?  It really depends on how you and your development team work.  Some things to consider:

 * How good is your external documentation?
 * How big is your codebase?
 * Is your architecture clear enough that the consequences of most changes are obvious?

Personally, I try to err on the side of more commenting- while I've seen some egregious examples of over-commenting, those are few and far between.  Under-commenting, though, I'd bet we've almost all been burnt by.
 
