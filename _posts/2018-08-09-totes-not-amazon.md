---
layout: post
title: Totes-not-amazon.com&colon; Markov Chain Generation for AWS Announcements
---

I challenge you to reliably tell the difference between [AWS](https://aws.amazon.com/about-aws/whats-new/2018/07/amazon-ec2-nitro-system-based-instances-now-support-faster-ebs-optimized-performance/?fc=p_2) and [Totes-not-amazon](https://totes-not-amazon.com/).

<!--break-->

The former, of course, is AWS's announcement blog.  It's capably written, but AWS's word-soup product names and features make it sometimes sound like it was written by a script.  So I built that.  Meet [https://totes-not-amazon.com](https://totes-not-amazon.com)!  I set it up to reroute you to a reusable link so people can share particularly funny results.  Click nearly any link to generate a new post.

Implementation-wise, it goes something like:

1. An offline script scrapes all 3k+ aws posts under aws.amazon.com/about-aws/whats-new and produces a json dump of these.  This is in ruby because I just wanted to get this step done fast and that's the language I know best at the moment.
2. Another offline script takes that json dump of blog posts + titles and fills up a markov model for text generation.  I used the excellent [Markovify](https://github.com/jsvine/markovify) libaray for that.  I went with python for this script because it seemed to have good markov libraries and also I needed to share some logic with step 4.  After generating the markov model, this script dumps that model to json.
3. Now, online, when a user hits totes-not-amazon.com/, the frontent js hits an api backed by AWS API Gateway, which triggers a lambda function.
4. The lambda function (which includes a copy of the dumped markov model json) loads up the markov model and generates a new randomized blog post + title, then returns it to the frontend JS.  I'd have used ruby here, but AWS Lambda doesn't support that yet.  I'd have used node, but I wanted to be able to specify a seed for the randomness used in the markov model, allowing me to reproduce especially funny results by specifying a seed.  JS doesn't allow that but python does.
5. Back in the clientside JS, we get the result of the api call (a blog post + title) and insert it into the page.

For the lambda function, I used the Serverless Framework for the first time, which was a pretty nice way of managing a lambda function.

For hosting + deploying the static files I used S3 + Cloudfront + ACM + Route53 (through my own [Scarr](http://kevinkuchta.com/2018/06/scarr/) tool).

If you want to see the code, it's kind of a mess, but it's at [github.com/kkuchta/aws_markov](https://github.com/kkuchta/aws_markov).  For a silly one-off like this I'm unlikely to go back and clean it up unless someone really wants me too.

Anyway, this is just some silliness and an excudes to mess with a bunch of random tools + languages.  Nothing serious today.  Go [play](https://totes-not-amazon.com) with it and tweet your favorites to [@kkuchta](https://twitter.com/kkuchta)!
