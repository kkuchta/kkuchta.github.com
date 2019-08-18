---
layout: post
title: Disguising Ruby as Javascript
---

Because my parents didn't raise me right, I decided to take [another](/2016/05/js-in-ruby/) crack at making valid ruby that is indistinguishable from javascript.

Update: This post became a [talk at RubyConf 2018](http://confreaks.tv/videos/rubyconf2018-ruby-is-the-best-javascript).

<!--break-->

This is valid *ruby*:

```
  var first = 3;
  var second = 4;

  var sum = function(a, b) {
    a + b;
  }

  console.log("Sum = ", sum(first, second));
```

Here's the code behind it:

```
  console = (Class.new { def log(*x); puts x.join(""); end }).new

  define_method(:var) { |random_function_name|
    var_name = local_variables.find do |local_var|
      local_var != :random_function_name && eval(local_var.to_s) == random_function_name
    end
    define_method(var_name) { |*args|
      send(random_function_name, *args)
    }
  }

  class Object
    def method_missing(*args)
      skip_methods = %i(to_a to_hash to_io to_str to_ary to_int)
      return nil if skip_methods.include?(args[0])
      return args[0]
    end
  end

  def function(*args, &block)
    func_name = :"func_#{rand(1000000)}"

    klass = Class.new { attr_accessor *args }
    function_block = Proc.new { |*arg_values|
      obj = klass.new
      args.zip(arg_values).each {|arg, arg_value| obj.send(:"#{arg}=", arg_value) }
      obj.instance_eval(&block)
    }

    define_method(func_name, &function_block)

    func_name
  end
```

### What The Hell, Kevin

Here's an overview of the techniques we're using:

`console` is just an instance of a class that has a `log` function.  Pretty straightforward.

`function(a, b) { ... }` is, rather than declaring a function, actually *calling* the function `function` with an arbitrary number of arguments and a ruby block.

We're able to reference `a` and `b` here when they haven't been defined yet by using `method_missing` on `Object` (which is the global default namespace).  When you reference some unknown identifier `whatever`, method_missing is called and returns the symbol `:whatever`.  Overriding the root method_missing is dangerous, though.  Some classes rely on the default method_missing function falling through for whatever reason, so we have to exempt them: `to_a`, `to_hash`, etc.

So, defining a function is actually `some_func(:a, :b) { ... }`.

Now how about those vars?  We could just `def var(_);end` and then var would ignore whatever we sent to it.  That'd let `var foo = 5` work, since it'd just be `var(foo = 5)`.  With var as a no-op, the local assignment sticks (and, importantly, happens before the the method_missing junk above gets triggered).

However, we don't do that because we need `var whatever = function(...) { ... }` to work.

When we call that `function` function, we _could_ return some sort of actual ruby function (eg a lambda).  However, we could only call that using ruby's weird syntax: `some_func.call(4)` or `some_func[4]`.  But we're hardcore javascript purists here!  We accept no substitutes!

Instead, what `function` does is defines a method on the global namespace with the contents of the block you gave it (eg `a + b`).  We use an anonymous class and `instance_eval` to provide the function's arguments to the block body.

But wait!  `function` doesn't know what it's called!  When you do `sum = function() {...}`, function has no way to know about `sum`.

So what `function` does is it defines its method on the global namespace with a random name (eg `func_492041`) and returns that string (symbol, actually).  Then `var` picks up both the name passed (eg `sum`) and the random function name (`func_492041`) and defines a global namespace method named `sum` that just calls `func_492041`.

`var` *does* have to get a bit clever since, if you'll remember, calling `var(foo = function{...})` doesn't actually pass `foo` to `var` in any way.  It just defines a `foo` local variable.  `var` *does* know the contents of foo, though: it knows it'll be equal to whatever was passed in to it (in this case, the symbol `:func_492041`).

To find its variable name, `var` just looks through the local namespace's list of variables (`local_variables.find`) and evaluates each one until it finds one that matches its input.  Once it finds that, it can define its global namespace method.

And so, finally, we can call the global namespace method `sum(3, 4)`, which calls `func_492041(3, 4)`, which evaluates the `{ a + b }` block in the context of a class that happens to have `a` and `b` members whose values are `3` and `4`, respectively.

### FAQ

Oh god why?  **Some devs just like to watch the world burn**

You realize this is terrible, right?  **Yes.**

Should I use this in production?  **Absolutely.  Please tell me how that goes.**

I can do this with fewer/more hacks! **Tweet at me (@kkuchta)!  The world-fire can always use more wood.**
