---
layout: post
title: Behandlung von Datenungleichverteilung in parallelen Hash-Joins
excerpt: "The title of this post is the German title of the thesis for my recently completed master's. I was excited that it had to have a German title, but it just might be more useful to show the English title: \"Handling Skew in Morsel-Driven Hash-Joins\"..."
featured-img: "/assets/images/oasis_sunset.jpg"
---
The title of this post is the German title of the thesis for my recently completed master's. 
I was excited that it had to have a German title, but it just might be more useful to show the English title: "Handling Skew in Morsel-Driven Hash-Joins".
My thesis (and most of my studies) focused on database internals.
It involves hash join optimizations that I tested in the [Umbra database system](https://umbra-db.com/).
Since I spent a ton of time describing exactly what I did, there isn't much reason to rehash ;) it here. 
Instead, I've copied the abstract below and provided a link to the full document.


### Abstract
Hash Joins are the dominant join technique in modern database systems; they are highly efficient and perform well on a wide range of data. 
Unfortunately, their performance can decline in the presence of skew.

Hash joins often use separately chained collision lists, which can become excessively long when build-side keys are highly skewed. During the probe stage, iterating through long collision lists results in poor cache performance. 
If the probe relation is also skewed, repeated linked list iteration amplifies this behavior.

Morsel-driven parallelism is an efficient method to achieve high concurrency in
modern relational database systems. The combination of Morsel-driven parallelism
with hash joins using chained collision lists causes a second problem — low thread
utilization. When the build relation is highly skewed, one morsel may produce far
more results than another morsel. If the imbalance between morsels is high enough,
the thread processing a long-running morsel will finish long after other threads. The
query is delayed until the slow thread finishes and resources are utilized poorly.

The issues of poor cache performance and low thread utilization can drastically
reduce the performance of hash joins on skewed data. To rectify these issues, we introduce two techniques: Node Compaction and Sub-morsel Stealing. Node Compaction
gathers skewed tuples and copies them into dense arrays of tuples, improving cache
utilization during probe. Sub-morsel Stealing allows one thread to help another thread
join skewed morsels, improving thread utilization.

Using these techniques, we improve the execution time of queries on many skewed
workloads. On a large subset of the Cardinality Estimation benchmark, these methods
achieve a mean speedup of 49%, with a maximum speedup of over 87x. At the same
time, we show that these techniques do not cause a significant reduction in performance
on non-skewed workloads, such as TPC-H.



### Thesis
[Handling Skew in Morsel-Driven Hash-Joins](/assets/files/ParkerTimminsMasterThesis.pdf)

