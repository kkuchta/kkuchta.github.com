---
layout: post
---
**Note:** *I use github's api as an example here because, at the time of writing, it supported both jsonp and basic authentication.  That is [no longer the case](https://github.com/blog/1160-github-api-v2-end-of-life), though, so these examples probably won't work as-is.  As far as I'm aware, though, the technique is still sound.*
<!--break-->

## JSONP background

[JSONP](http://en.wikipedia.org/wiki/JSONP) is the name for a technique to get around the [same-origin policy](http://en.wikipedia.org/wiki/Same_origin_policy).  It works pretty well when you're trying to make a cross-domain request- for example, to some service's api, without using a server proxy.  In my case, I was trying to build a tool that would work from a flat file.

## The problem

JSONP [doesn't work](http://stackoverflow.com/questions/1640391/how-do-i-make-a-jsonp-call-with-jquery-with-basic-authentication) with basic authentication.  We can verify this by skipping the jquery shortcuts and trying a very simple jsonp request by hand:


     function makeRequest(username,password){
        var url = "https://" + username + ":" + password + "@api.github.com/user?callback=jsonpCallback";
        var scriptToAdd = $('<script type="text/javascript" src=""></script>');
        scriptToAdd.attr('src',url);
        $('body').append(scriptToAdd);
    }
    function jsonpCallback(response){
        console.log( "response=",response );
    }


The above code attempts to make an authenticated request by appending a script tag with an src of "user:pass@host.com/path."  Test it out by adding that (and jquery) to a page running `makeRequest( 'kkuchta', 'hunter2' );`, substituting your username and password, of course.  Inspect the resulting object, and you'll see that the authentication failed.

## The solution

Script tags may not like authentication in the url, but image tags don't mind it.  Furthermore, basic authentication will get cached.  As such, all we need to do it add an image element whose src is our url with basic auth, then wait for it to load:


    function makeRequest(username,password){
        var imgUrl = "https://" + username + ":" + password + "@api.github.com/user";
        var scriptUrl = "https://api.github.com/user?callback=jsonpCallback";

        // Attach image to cache auth
        var img = $('<img />').attr( "src", imgUrl );
        $('body').append(img);
        img.remove();

        // Let the image load, then do the jsonp request
        setTimeout(function(){
            var scriptToAdd = $('<script type="text/javascript"></script>');
            scriptToAdd.attr('src',scriptUrl);
            $('body').append(scriptToAdd);
        },1000);
    }
    function jsonpCallback(response){
        console.log( "response=",response );
    }

Again, try `makeRequest( 'someGithubUser', 'someGithubPass' )`.  This time, the resulting object should the correct, authenticated response.  Jsonp with basic auth, woo!  You should only have to do this once per session- all jsonp requests thereafter should be go right past the authentication.  This also works fine with at least jQuery's jsonp- presumably any other jsonp wrapper as well. 
