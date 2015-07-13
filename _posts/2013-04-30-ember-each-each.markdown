---
layout: post
title: Ember.js @each@each workaround
---
## Background

This is just a simple workaround post for future references.  For more in-depth reading, read up on Ember's [object model](http://emberjs.com/guides/object-model/observers/).
<!--break-->

Anyway, when you're declaring observers in ember, `.@each` is super-useful for observing elements of arrays in your object.

However, what happens when you want to observe elements of elements of an array?  For example, let's say you have a Grid object that has a grid of Square objects (each of which has a 'color' field).  You could do this as a 2D array (or an `Ember.A()` full of `Ember.A()`s).

The trick is when you want to observe elements in those nested arrays.  Assuming the 2D array is under, say, "rows", you'd think you could just declare an observer function inside Grid like `.observes('rows.@each.@each.color')`.

## Not so

Turns out it doesn't work.  Here's a simple proof-of-concept:

<iframe width="100%" height="300" src="http://jsfiddle.net/Wsc8e/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
Switch to the results page, then pop open your console, and press the button to see the output- the 'Government' object doesn't properly observe the citzens.

This is a known issue, and isn't scheduled to be fixed until maybe version 1.1 (We're on 1.0 rc3 as of this writing): [Github issue](https://github.com/emberjs/ember.js/issues/541).

## Workaround

We have to add an intermdiary object:

    App.Row = Ember.Object.extend({
        '@eachname': function(){}.property('contents.@each.name')
    });

Then, instead of a 2D array, we have an array full of Row objects:

    this.get('rows').pushObject(App.Row.create({'contents':row}));

Finally, instead of observing `rows.@each.@each.name`, we observe `rows.@each.@eachname`.  Put it all together and you get:

<iframe width="100%" height="300" src="http://jsfiddle.net/b9Zxp/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Magic!  Hacky, hacky magic.  You'll have to define an intermediary function on Row for each property of the elements you want to observe.  Here's hoping this gets fixed soon!
