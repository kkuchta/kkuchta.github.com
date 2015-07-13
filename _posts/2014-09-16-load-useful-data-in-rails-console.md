---
layout: post
title: Load useful data in the rails console
---

### The basics

I spend plenty of time in the rails console in my local dev environment, and I often find myself in need of dummy data or specific objects set up to mess around with.  For example, the user I test most things with is KevinKuchta, so I might run `kevin = User.find_by_username('KevinKuchta')`.  It's like 40 characters long, but I type it often enough that I'd love to optimize it (and similar bits of code).
<!--break-->

It's pretty simple:

1. Make sure you're using [pry](http://pryrepl.org/).  It's better than irb, and also lets us have per-project rc files (irb only has the global `~/.irbrc`).
2. Use `pry-rails`.  It's possible to [configure rails to use pry for rails console sessions](https://github.com/pry/pry/wiki/Setting-up-Rails-or-Heroku-to-use-Pry#with_gemfile), but [pry-rails](https://github.com/rweng/pry-rails) does it for you.
3. Make yourself a `.pryrc` file at the root of your project.  These bits of code I want are, at least for me, all project-specific.  I don't want to try to load the KevinKuchta user over in an unrelated project that doesn't even have a user model, so I need a project-specific pryrc.
4. Fill it up with this:

    ```
    class Object
      private
      def kevin
        User.find_by_username('KevinKuchta')
      end
    end
    ```
5. Save the `.pryrc` file and open the rails console.  Enter `kevin`, and the above code will be called.

    ```
    ~/code/some_rails_project> bundle exec rails c
    Loading development environment (Rails 3.2.17)
    [1] pry(main)> kevin
      User Load (1.4ms)  SELECT "users".* FROM "users" WHERE "users"."username" = 'KevinKuchta' LIMIT 1
    => #<User id: 123, username: "KevinKuchta">
    ```

As you can see, we're tacking my helper function onto the global object.  We could make a `Util` class or something, but I'd rather call `kevin` than `Util.kevin`.  The functions on `Object` are accessible without any prefix, allowing us to call our methods more succinctly

Note that we declare out helper function as private so it's not available on anything that extends ruby's base object: `Hash.new.kevin` would return my user if it weren't private.

### A bit better

Now, this still isn't quite as nice as I'd like it.  `kevin` is reloaded from the database every time I use it, wiping out any unsave changes.  Let's memoize it:

```
def kevin
  @_kevin ||= User.find_by_username('KevinKuchta')
end
```

Now I can modify that record and the database is only hit once:

```
[1] pry(main)> kevin.email = 'foo'
  User Load (0.8ms)  SELECT  "users".* FROM "users"  WHERE ...
=> "foo"
[2] pry(main)> kevin.email
=> "foo"
```

### A just a little further
 Now let's generalize that logic a bit so we can easily define as many of these variables as we want.  It's a bit of ugly metaprogramming, but this isn't production code, so it's alright!

 ```
class Object
  private
  def populate(name, &block)
    self.class.send(:define_method, name) do

      instance_variable_name = '@_' + name
      value = instance_variable_get(instance_variable_name)

      unless value
        value = block.call
        instance_variable_set(instance_variable_name, value)
      end

      value
    end
  end
end

populate('kevin') do
  User.find_by_username('KevinKuchta')
end
```

Now there's a nice little method you can use.  These variable can even depend on eachother:

```
populate('balance') do
  kevin.account.balance
end
```


And there you have it.  Lazy-loaded, prepopulated data in your rails console.
