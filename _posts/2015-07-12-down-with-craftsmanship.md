---
layout: post
title: Down With Craftsmanship
---

The appeal to "craftsmanship" is a blight on software engineering decision-making.

Maybe you've been through a technical debate like this:<!--break-->

> Vladamir: I'll build this feature using a few ActiveRecord callbacks and simple config file.
> Estragon: No, we should build it using several service objects with the data stored in postgres.
> Vladamir: Why should we do that?  It'd take twice as long.
> Extragon: Because it's the right solution.
> Vladamir: Sure, but but we could get this feature out a week earlier if we did it my way.
> Estragon: Have you no pride in your work?  We have a duty to build the best thing we can.  We are craftsmen, and we should act like it!

Who is right?  Really, it could be either of them.  Don't focus on the subject, but the argument.  Estragon's argument, though noble-sounding, is deliberate blindness.

Because really, everything in software development is a trade-off:

  - Speed of development vs maintainability
  - Understandability vs performance
  - Usability vs staying true to the underlying model
  - etc vs etc

Arguing for "pride in our work" is just one side of a trade-off masquerading as a platonic ideal.

To be clear, I'm *not* arguing that you should write bad code.  I'm arguing that you should be aware of the trade-offs you're making.  Appealing to "craftsmanship" as a noble goal in and of itself is just closing your eyes to the actual decision you're making and pretending it doesn't exist.

Appealing to craftsmanship is usually part of the "build it fast and get business value now" vs "built it more carefully and hopefully get business value later" debate.  Both sides of that argument have merit, and which one you pick depends on your business needs and the exact weights of each side for the specific code in question.  Appealing to craftsmanship is burying your head in the sand and declaring one side universally superior.  You may feel better, but you're being foolish.

Now, you might argue that doing it "right" is always in the best long-term interest of the project.  Consider a hypothetical project:

- Your development costs for this project are $50k/mo
- You can build a slapdash version of in 3 months and have to spend 6 months rebuilding it a year later.  Or you can build it well in 6 months and never have to rebuild it.
- Let's say the project generates $60k/mo once it's completed.
- If you do it the "right" way, it costs you $300k to build it now and generates $1,080k in revenue by the end of two years.
- If you do it the "wrong" way, it costs you $450k in development costs ($150k now, and $300k later).  It ends up generating $1260k by the end of two years.
- In this case, the "right" way netted you $780k profit while the "wrong" way netted you $810k.

Now, I'm *not* saying that doing it the "wrong" way is always best.  This is obviously a contrived example.  I'm saying that you should have this debate, rather than putting your fingers in your ears and pretending that the "right" way is the only path for a true engineer.

That kind of puritanical argument has no place in the lexicon of a well-rounded developer with any thoughts of seeing beyond his or her narrow field of work.

So, up with considering both sides.

Up with carefully considered trade-offs.

Up with well-written, maintainable code *when that is what is in the business' best interest*.

Down with "craftsmanship."
