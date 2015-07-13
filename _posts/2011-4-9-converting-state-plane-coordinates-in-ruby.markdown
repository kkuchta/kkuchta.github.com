---
layout: post
title: Converting state-plane coordinates in ruby
mt_id: 21
date: 2011-04-09 14:59:36.000000000 -07:00
---
I got a pile of data with coordinates last night.  The coordinates were in State Plane NY West format, which is a [semi-state specific](http://en.wikipedia.org/wiki/State_Plane_Coordinate_System) coordinate system that needs to be translated before you can use it like latitude/longitude.  There are better references out there if you want a thorough treatise on the subject, but I thought I'd give the concrete solutions I came up with in case you, like me, just want to get lat/lon and could hardly care less about 80's era cartography.
<!--break-->

1.  Install [proj4](http://trac.osgeo.org/proj/), the 80's-era c library that everything relating to geospatial coordinate transformations seems to be built on.  This is *related to* and possibly the basis for, but not actually the same thing as [gdal](http://gdal.org/).  Gdal has some handy command-line tools in case you don't need to do this programmatically.  Further, it takes similar projection strings as proj4.

    Anyway, build it from source.  I had no trouble on Mac OS 10.6.

2.  Install the [ruby bindings](https://rubyforge.org/projects/proj4rb/).  I had to build from source here (ruby 1.9.2) too- their build instructions were pretty handy.  Just go through the configure/make/make install stuff, then rake as a gem, then gem install that local gem.

3. Code it up:

		require 'proj4'
		proj = Proj4::Projection.new '+proj=tmerc +lat_0=40 +lon_0=-78.58333333333333 +k=0.9999375 +x_0=350000 +y_0=0 +ellps=GRS80 +units=ft +no_defs'
		geox = 1394144.401
		geoy = 1165107.387
		latlon = proj.inverse Proj4::Point.new(geox,geoy)
		converter = (180 / Math::PI)
		puts "lat = " + (latlon.lat * converter).to_s
		puts "lon = " + (latlon.lon * converter).to_s

Note that geox and geoy are the inputs.  The string of parameters in the call to Projection.new is what defines the initial projection (that is, the state plane) that the input is on.  You'll want to replace that with the one for your state.  To get that info:

1. Go to http://home.comcast.net/~rickking04/gis/spc.htm and look up your FIPS zone.  Mine is 3103, since my data is for Monroe county, NY.
2. Go to http://spatialreference.org/ref/esri/ and enter your state.  There should be a short list of results, one of which has your FIPS zone in it.  Mine is "ESRI:102317: NAD 1983 HARN StatePlane New York West FIPS 3103".  Click on it.
3. Click on the "Proj4" link, which should take you to the string you want.  Mine is "+proj=tmerc +lat_0=40 +lon_0=-78.58333333333333 +k=0.9999375 +x_0=350000 +y_0=0 +ellps=GRS80 +units=m +no_defs".  Note that you may need to change the 'units' element in that string- mine was in feet, which is 'ft'. 
