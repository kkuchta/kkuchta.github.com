---
layout: post
title: Twitter + Ffmpeg
---

Want to upload audio to twitter?  You can't.  You'd have to upload it to soundcloud, then post that link to twitter.  Some clients will give you a nice in-app soundcloud player and some won't.

You *can* upload video to twitter, though.  <!--break--> You still need to show something, though, so maybe you play your audio over a still-image video.  Ffmpeg can definitely do that, but it took me a while to figure out the right combination of settings.  Maybe this will save someone else a half hour of headache trouble- this command will merge an image and an audio file in such a way that twitter will accept it.

If you're curious, this is for https://twitter.com/thescreambot and the audio is the output of amazon polly.

```
"ffmpeg -i audio_file.mp3 -f image2 -loop 1 -r 25 -i image.jpg -shortest -vcodec libx264 -pix_fmt yuv420p -acodec aac -y -profile:v baseline out.mp4"
```
