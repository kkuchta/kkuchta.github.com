---
layout: post
title: Wrttnin Quine
mt_id: 16
date: 2010-07-21 23:41:39.000000000 -07:00
---
Because I got bored and my javascript is rusty, I put together what I'm calling a Wrttn.in quine.
<!--break-->

**Edit:** Does not appear to be working in Chrome (my main browser).  I'd only tested it in Firefox so far because A) firebug rocks and B) I'm too lazy to care about cross-browser compatibility in my free time.  I'll take a look at the problem sometime soon when it's not after midnight on a workday.

#### Wrttn.in
Wrttn.in is just a notepad-type site.  It's similar to a.longreply.com.  You enter some text, hit save, and it gives you two urls: a public one that shows that text (eg, wrttn.in/323f1) and a private one that allows you to administer it (eg. wrttn.in/admin/46feb701xda).  Now, as it happens, the text you enter will not be sanitized for html or javascript... :D

#### Quine
A [quine](http://en.wikipedia.org/wiki/Quine_(computing)) is a programmer toy.  It's a program that outputs a copy of it's source code.  What I've written is a hunk of javascript that, when placed in a wrttn.in page, will put a button on the page.  Pressing that button will ajax up a new wrttn.in page, populate it with the same code as the initial page, and redirect to it.  Not a traditional quine, of course, but it's the same spirit.  :)

#### Explanations
A few things to explain in the following code:

 *  It's possible to pass in content on a wrttn.in create call, but that content will be stripped of it's javascript.  That's why we have a subsequent edit call- edit does not strip it.
 *  This may not work long since we're not using an api or anything stable- the calls were just reverse engineered from the pages.  It'd be pretty easy for the wrttn.in creator to shut down this code he decides to.  Just has to sanitize his edit inputs.
 *  Content type has to be markdown.  Textile encodes the quote marks.
 *  This is a quick hack- nothing more.  Don't expect great code.

#### Code
	<div id="vcms_whole">
		<div id="vcms_content"><input type="button" id="btnCreateNew" value="Create New!"/></div>
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.2.js" charset="utf-8">
		</script>
		<script type="text/javascript" charset="utf-8">
			function createNewPage(){
				var wcms_wholeElement = document.getElementById("vcms_whole");
				var outerDiv = document.createElement("div");
				outerDiv.appendChild(wcms_wholeElement);
				wholeHTML = outerDiv.innerHTML;
				var publicId = "none";
				$.ajax({
					async: false,
					url: 'http://wrttn.in/create',
					dataType: 'html',
					type: 'POST',
					data: {content:wholeHTML,parser:'markdown'},
					success: onCreateSuccess,
					cache: false
				});
				var fullEditUrl = "http://wrttn.in"+editUrl;
			
				//Send edit request because 'create' filters out the javascript, but edit does not.
				$.ajax({
					url: fullEditUrl,
					dataType: 'html',
					async: false,
					type: 'POST',
					data: {content:wholeHTML},
					success: onEditSuccess,
					cache: false
				});
			}
		
			function onCreateSuccess(data, status, request){
				var dataEl = $(data).filter("title");
				var titleText = dataEl.text()
				adminId = titleText.replace("wrttn admin:","");
				var idLink = document.createElement("a");
				var something = $(data);
				var editEl = $("#edit",something);
				var formEl = editEl.children("form")[0];
				editUrl = formEl.attributes.getNamedItem("action").value;
				var editUrlSections = editUrl.split("/");
				publicId=editUrlSections[editUrlSections.length-2];
			}
		
			function onEditSuccess(data, status, request){
				window.location='http://wrttn.in/admin/'+adminId;
			}
		
			function setup(){
				$("#btnCreateNew").bind('click',createNewPage);
			}
		
			setup();
		</script>
	</div>

I have a slightly more interesting application for this technique, but I'll post about that when/if I actually get to it. 
