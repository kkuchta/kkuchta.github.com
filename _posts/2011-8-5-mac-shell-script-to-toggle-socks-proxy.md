---
layout: post
title: Mac shell script to toggle socks proxy
mt_id: 23
date: 2011-08-05 15:57:40.000000000 -07:00
---

### What

A simple script that'll toggle your System Preferences proxy settings on a Mac.  It takes one argument- the name of the interface on which to toggle the proxy (eg, 'Airport' or 'Ethernet').  You can easily wrap this with an automator script using the "Get specified text" action to provide the argument and the 'Shell Script' action to run the script.
<!--break-->

Uses growl to notify you of what it's done.  That can be removed if you want- just delete the end of the script below the relavent comment.

### How

Nothing too complex here- uses the mac command line 'networksetup' tool, which allows command-line modification of network setting, to get and set the proxy state.  Then it uses the mac command line 'osascript' tool, which runs apple script, to notify growl.  The applescript in question just registers itself, then sends the message.

### Code

    {% highlight bash %}
    # Get current status
    interface=$1
    status=`networksetup -getsocksfirewallproxy $interface | grep "^Enabled: [a-zA-z]*$"`
    echo "status=$status"
    if [ "`echo $status | grep "No"`" ]; then
        newState="on"
    else
        newState="off"
    fi

    # Set new state
    networksetup -setsocksfirewallproxystate Airport $newState

    # Print message (delete after here to remove growl notification)
    if [ "$status" ]; then
        message="$interface socks proxy is now $newState"
    else
        message="Error toggling socks proxy on interface:'$interface'"
    fi
    osascript -e 'tell application "GrowlHelperApp"' -e 'set the allNotificationsList to {"Toggled"}' -e 'set the enabledNotificationsList to {"Toggled"}' -e 'register as application "Proxy Toggler" all notifications allNotificationsList default notifications enabledNotificationsList' -e "notify with name \"Toggled\" title \"Toggled\" description \"$message\" application name \"Proxy Toggler\"" -e 'end tell'
    {% endhighlight %}
 
