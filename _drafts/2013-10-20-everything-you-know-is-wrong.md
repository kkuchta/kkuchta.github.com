---
layout: post
title: Everything You Know (About Interviewing) is Wrong
---
> Everything you know is wrong <br>
> Just forget the words and sing along <br>
> All you need to understand is <br>
> Everything you know is wrong <br>

> \- Alfred Yankovic

If this were a more link-baity blog, I would start explaining some hip new interviewing technique that is better than everything else.  However, the title isn't link-baiting; every major technique for technical interviewing is broken, and you know it (if you follow HackerNews long enough).

When I say broken, thought, I should elaborate.

When you're hiring developers, you're trying to avoid a couple things:

1. Letting through crappy devs (false positives)
2. Missing out on good devs (false negatives)

Every popular interview technique fails at least one of these.

### Logic Puzzles

"Three lightbulbs are trying to cross a river in a 100-story boat etc etc".  The idea that these suck is pretty well established in the silicon valley tech scene.Fermi problems, riddles, manhole question- don't do them.  Microsoft apparently did these at one point.  Google has either long since stopped using them or never started.

I could get into more detail, but there have been plenty of better blog posts on this particular interview technique:

- [Tricky logic puzzles (Programmers.StackExchange.com)](http://programmers.stackexchange.com/questions/68120/tricky-logic-puzzles-are-they-really-useful-in-assessing-programming-skills)
- [The Hardest Interview Puzzle Question Ever (CodingHorror)](http://www.codinghorror.com/blog/2009/03/the-hardest-interview-puzzle-question-ever.html)
- [Google Puzzle Questions](http://www.deathandtaxesmag.com/200732/google-admits-its-famous-job-interview-questions-were-a-complete-waste-of-time/)

Luckily, a lot of tech companies understand by now that if you give your candidates logic puzzles, you get people that love logic puzzles, a trait that is weakly (if at all) correlated with development skill.  As such, logic puzzles suffer significant false positives and false negatives.

### Tech Trivia

You probably know this kind of question before I even describe it: What does the 'volatile' keyword do?  How does this obscure js edgecase work?  Show me both the ruby lamda syntaxes.

<a href="http://dilbert.com/strips/comic/1998-05-17/" title="Dilbert.com"><img src="http://dilbert.com/dyn/str_strip/000000000/00000000/0000000/000000/10000/2000/700/12758/12758.strip.sunday.gif" border="0" alt="Dilbert.com" /></a>

Trivia questions are a great way to feel superior, and are easy to administer without much thought.  If *you* know the answer, surely any competent developer familiar with the tech stack in question would know it, right?

As it turns out, most languages and frameworks have far more dark corners than you think.  A dev can spend several years using a tool and still be missing a few sections of it.  A high-level example might be a java programmer doing some heavy web development and building a lot of interesting things, but not really knowing much about the Swing classes.

Next time you get a chance, ask your dev team what their most interesting trivia around your tech stack would be and see how many of those you knew.  70%?  80%?  These are people on your team with your exact projects.  Imagine a qualified dev that just happened to work on different types of projects than you getting those questions.  Would they get more than 50%?

Don't ask trivia questions.  If the answer can be found with 30-seconds and a search engine, it's probably a dumb question.  It correlates poorly with actual developer quality and is the source of many false positives and negatives.

For fun, here's a few blog posts that elaborate on why quiz-show interviews are terrible:
- [Death to the Trivia Interview](http://nomadic-developer.com/2009/02/24/death-to-the-trivia-interview-or-what-is-the-meaning-of-irony/)
- [Guerrilla Interviewing](http://www.joelonsoftware.com/articles/GuerrillaInterviewing3.html)
- [Proof That Programming Language Trivia Is Stupid](http://sd.jtimothyking.com/2008/11/21/proof-that-programming-language-trivia-is-stupid/)

### Algorithm Questions

The previous question types are pretty widely accepted to be crap these days, but now we're wading into slightly more controversial territory: algorithmic quesitons.  They can range from simple linked-list reversal to [ridiculous math problems](https://projecteuler.net/problem=489).  Graph traversal, exotic data structures, variations on np-complete problems, and of course the time/space-complexity of everything.

To figure out whether you should be asking this sort of question (spoiler: no), let's try another thought execise.  Think over the last year, and think how much tem you spent on, say, tree traversal.  For the overwhelming majority of professional developers, the answer is probably around an hour.  If you worked 40 hours a week, 50 weeks a year, you spent 0.05% of your time on algorithm stuff.  Clearly, then, you should spend a similar amount of time asking tree-traveral questions in interviews.  That'd be 3.6 seconds.

Unless you're interviewing for a position that is *actually* algorithms intensive, you should *not* be wasting your time on this stuff.

The classic argument in favor of these, of course, is that they correlate with being generally smart.  To which I can only reply: no.  I know way too many programmers who could tell you the ins and outs of sorting algorithms but couldn't actually build anything.  Even if you're looking for aptitude, realize that you're actually just selecting for people who've been in school recently or have spent a lot of time stidying something they only need to use for interviews.

- [Stop asking me math questions (HN)](https://news.ycombinator.com/item?id=6583580)
- [Optimizing to hire the wrong developer](https://medium.com/p/9a3781d57c4b)
- [Optimizing to hire the wrong developer](https://medium.com/p/9a3781d57c4b)

And for the love of god: unless you're hiring someone to code on a whiteboard- don't test them on how well they can code on the whiteboard.

2. Algorithm questions are fun to ask, and make the interviewer feel smart, but unless you're hiring for an algorithm intensive position, I feel your wasting your time.  You don't implement Quicksort in real life; if you are, you have either a truly rare job or you're doing something wrong.  Most developers spend about the same amount of time cleaning their screens, annualy, as they do completing tasks that use their algorithm skills.
    - 

3. You can ask background questions ("Tell me about your last big project / a time when you struggled / how you first got into programming"), but those are easy to fake.  You might get useful information, but you might also just be selecting for fast talkers.

4. If you ask for code samples, you miss plenty of good developers who value work-life balance and don't do side projects.

5. The best way to know if someone is worth working with is to work with them, right?  So maybe you should do short-term contracts or trial periods.  Except in this economy, there are a dozen other great companies willing to hire a good developer immediately.

6. You can do in-person real-life coding challenge ("Write tic-tac-toe in the next 30 minute", "Build a reservation system in the next couple hours").  Of course, now you're just selecting for people who know the specific tools and languages you make them use.

7. Paired programming seems like a good way to get a feel for a candidate.  However, paired programming it definitely a skill, and someone not used to having another developer over their shoulder is *not* going to perform well.

8. You can evaluate on hard credentials (years in industry, gpa, etc), but you'll find out what most of the industry already knows by now: those are only weakly associated with the ability to get things done.
