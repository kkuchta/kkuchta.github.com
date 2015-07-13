---
layout: post
title: Fishy Code&#58; In Which I Lose My Mind
---
### An Unexpected Journey

> Localhost?  Why the hell is it accessing localhost?

Those words ran through my head while I peered at a pile of compressed javascript.  It was in a js file being loaded from a remove server- `someservice.com/api.js`.  It was part of a connection speed test api I was using on a weekend project.
<!--break-->

I was trying to figure out why this file was making ajax calls when the file was loaded, rather than when it was being used.  The code was clearly minified, but I can usually muddle my way through the useless variable names to figure out what's going on.

This code was a bit different, though.  Take a look:

```
        var q8 = parseInt(K8, 2),
            M8 = 'http://localhost?q=;%29%28emiTteg.%29%28etaD%20wen%20nruter',
            W8 = M8.constructor.constructor(unescape(/;.+/ ["exec"](M8))["split"]('')["reverse"]()["join"](''))();
        return {
            L8: function(w8) {
                var c8, B8 = 0,
                    v8 = q8 - W8 > e8,
                    p8;
                for (; B8 < w8["length"]; B8++) {
                    p8 = parseInt(w8["charAt"](B8), ((0x190, 0x186) < 0xB0 ? (62., "c") : (0x16E, 7.16E2) >= 143. ? (148., 16) : (5.850E2, 56.)))["toString"](2);
                    var T8 = p8["charAt"](p8["length"] - 1);
                    c8 = B8 === 0 ? T8 : c8 ^ T8;
                }
                return c8 ? v8 : !v8;
            }
        };
```

At first glance, it's mostly gibberish.  I wouldn't have given it a second look if it weren't for the `localhost`.  Why the hell would it need that?  This is meant to be included on a web page loaded by end users- there’s no reason to load something from their machines (even if the same-origin policy didn’t prevent it).

So, the first step is to see where that’s being used.  Turns out it's used only in the two lines above: `M8 = ...` and `W8 = ...`.  And what the heck is `W8 = ...` doing?

I broke it down from the middle:

    /;.+/ ["exec"](M8)

That's just running a regex over that localhost url.  It seems to just pull out everything after the semicolon.  As such, it just gets `%29%28emiTteg.%29%28etaD%20wen%20nruter`.

With that result, it runs `unescape`, `split`, `reverse`, and `join`, producing
the following steps:

    ";)(emiTteg.)(etaD wen nruter"

    [";", ")", "(", "e", "m", "i", "T", "t", "e", "g", ".", ")", "(", "e", "t", "a", "D", " ", "w", "e", "n", " ", "n", "r", "u", "t", "e", "r"]

    ["r", "e", "t", "u", "r", "n", " ", "n", "e", "w", " ", "D", "a", "t", "e", "(", ")", ".", "g", "e", "t", "T", "i", "m", "e", "(", ")", ";"]

    "return new Date().getTime();"

Alright, there's no way any js minifier or compiler would go so far out of its way just to produce that string.  This was intentionally obfuscated.

Continuing on, it runs `M8.constructor.constructor( ... )();` on it.  What's going on here?  Again by steps:

If `M8` is a string, then `M8.constructor` is just the string constructor- a function used to create a string.  It's the same thing you're using when you call `String('foo')`.  In fact, `'somestring'.constructor === String`.

So, it's a function that produces a string.  Now, what's
`M8.constructor.constructor`?  It's a constructor for a function!  `"foo".constructor.constructor === Function`.  You may not use the function constructor all that often, but `function(){return 3}` is the same as `Function('return 3')`.

So, put it all together and the M8/W8 lines translate to:

    (function(){ return new Date().getTime(); })();

For all that, W8 is just the current time.  WTF.

### Several Hours Abbreviated

While that's not nefarious in itself, the fact that they went so out of their way to hide it is certainly suspicious.

I'll skip ahead a bit, but here's what I found:

- That date is compared against a hard-coded date in late 2014 (a few months after the date I was coding this in).
- Huge swaths of code change entirely after that date.  Many normal functions names (like `setAttribute`) are built up using variables (eg `a1 + b2 + c2`) whose values hinge on that date comparison.  Today, those variables add up to `setAttribute`, but after that pivotal point in time, they make up... something else.
- Setting my system clock past that data doesn't reveal anything- the site breaks with some undefined function error deep in the rest of this api file.

What's going on?!  Is this set to do something evil after a certain period of time?  Is it something horrible, but just implemented incorrectly?  I'm a little concerned at this point, and thinking about how to publicly warn other users of this code before that doomsday arrives!

### Sanity prevails, or at least makes an appearance

At this point I stopped to take a break, have dinner, and consult with a few friends who haven't been going blind staring at obfuscated code all day.

The root of the puzzle seems to be:

- I can't find anything actually malicious in this file.
- But someone's clearly gone out of their way to make reverse engineering it a lot of work.
- There's a significant date in late November, 2014.

Eventually, a simpler conclusion dawned on me: the providers of this js file just don't want anyone using their public api.

You and I both know, of course, that you never trust the client-side javascript.  If my website’s JS prevents a user from, say, editing another user's content, but my server doesn't enforce this limitation, it's pretty easy for a savvy user to circumvent that client-side code.  You can make life harder for that savvy user by hiding what your javascript is doing, but all you're doing is slowing them down a little.  Why even bother, when you could instead focus on securing your server?

Well, these guys bothered.  They obfuscated the javascript so I couldn't easily abuse their servers by mimicking what their client library did.  The client library is supposed to be hot-linked directly from their site, so there’s a date limitation to prevent me from downloading the api.js file and serving it from my server.

### The moral of the story

There is no real moral.  Don't trust foreign JS unless you trust the provider, even though it turned out to be fine this time.

Hopefully, though, if someone else out there sees this code and searches for a portion of it (as I did, early on in my wasted afternoon), they'll find this post and benefit from my conclusions.

