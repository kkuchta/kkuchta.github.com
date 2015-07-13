---
layout: post
title: Chrome is too smart for its own good
---

Run the following into the chrome console:

    (function(){
        var foo = 3;
        (function(){
            debugger
        })();
    })();
<!--break-->

When the debugger line gets hit, type `foo`.  Result?  `ReferenceError: foo is not defined`.  What gives?  `foo` should be in the closure scope!

I'm guessing that Chrome is just trying to be smart here and remove variables that are never used or referenced in any function that has access to the closure scope.  So, when we log `foo`, chrome detects that and keeps it available.  When we don't, though, it cleans it up pre-emptively.

Try this:

    (function(){
        var foo = 3;
        (function(){
            debugger
            console.log(foo);
        })();
    })();

Magically, foo is now defined in that inner scope.  
