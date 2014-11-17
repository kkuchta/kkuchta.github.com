# Personal Site

Just a blog and with some project pages and contact info.

## Use

It's mostly a stock [Jekyll](http://jekyllrb.com/) setup. If you're just adding content, all you need to do is run:

    jekyll serve -w

Do that from the root of this repo and it'll monitor content changes and show the resulting site at `localhost:4000/_site/`.

If you want to play with the layouts, don't change the .html files in `/_layouts` or `/_includes`.  Instead, run:

    bundle exec guard start

(Assuming you've already run `bundle install` or have the necessary gems on hand)

This'll watch for changes and compile the haml files to html so jekyll can pick them up without having to kow about haml.  I had to do this because stock github pages' jekyll version doesn't allow fancy plugins (which I'd need to have it auto-compile haml).
