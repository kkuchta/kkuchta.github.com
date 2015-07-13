---
layout: post
title: How to analyze global functions from a chrome content script
mt_id: 18
date: 2010-12-17 18:12:07.000000000 -08:00
---
So, it turns out that the code run in chrome content scripts run in their own context.  As such, I can't access global variables set by in-page code.  However, chrome content scripts do use the same DOM.  Further, when  &lt;script> elements are inserted into the DOM dynamically, they're run using the page's context, and can access those global variables/functions.
<!--break-->

In this example, insertToDOM just adds the code as the content of a script element to the <head> element (this code uses JQeury, but you could easily do it without.

	function insertToDOM(code){
		$("head").append( $('<script language="javascript">' + code + '</script>'));
	}

Now, to get all user-defined functions, we need to filter out all the normal javascript functions.  In this case, we're analyzing the function bodies- built-in functions will have bodies containing "[native code]", so we can just get rid of those.  Everything that reaches the `console.log(window[f].toString());` line will be a user-defined function.  Note that the toString method called on a function object will return its body.

	insertToDOM(
		'for (var f in window){'+
			'bodyString = window[f]!=null ? window[f].toString() : "";'+
			'if(bodyString.indexOf != null && bodyString.indexOf("[native code]")==-1 && bodyString.indexOf("function ")!=-1 ){'+
				'console.log(window[f].toString());'+
			'}'+
		'}'
	);
	
### Irrelevant background
This code is part of an ongoing christmas javascript war I'm having with the webmaster of a forum I frequent.  He annually covers his site with christmas themed decorations and obnoxious mouse-following reindeer.  I wrote a chrome plugin to revert it.  He wrote a script to detect my code and redirect to internet shock sites if it's found.  We've been going back and forth recently- he'll fix his code, I'll fix mine.  This is my latest blow- a variant on this detects if the function body contains redirect code and kills the function if it does.  I could just fix my code following his next move and then just stop publishing my code, but where' the fun in that?  :D

Code for the above plugin, if anyone's interested, can be found at https://sse.se.rit.edu/hg-manage/kmk3817

**Edit:** For a later version of this I threw together an insertToDom function that takes a function object, chops out the body, and inserts that.  So, passing in "function(){alert("test");}" will add "alert("test")" to the DOM in a script element.

	function insertToDOM(func){
		//everything between the first and last brackets.
		funcString = func.toString();
		funcStringArray1 = funcString.split("}");
		funcStringArray1.pop();
		funcString = funcStringArray1.join("}");
		funcStringArray2 = funcString.split("{");
		funcStringArray2.shift();
		funcBody = funcStringArray2.join("{");
		$("head").append( $('<script language="javascript">' + funcBody + '</script>'));
	} 
