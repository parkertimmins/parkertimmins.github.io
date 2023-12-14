---
layout: post
title: Practical Techniques for Hash Joins with Duplicate Keys
excerpt: Optimizing hash tables and hash joins for repeated keys
featured-img: "/assets/images/colorado_trail_banner.jpg"
---
From 2021 to 2023, I completed a master's degree with a focus on database internals at the Technical University of Munich. 
(Technically the degree title was Data Engineering and Analytics, but I swerved hard into database internals).
During the winter of 2022/23, I conducted research on optimizing hash joins. 
I used a method proposed in a recent paper and applied it to a real-world, highly concurrent modern hash join. 
During the completion of this work, I was advised by Philipp Fent.
Below, I've included the abstract of the paper, along with a link to the full document.


### Abstract

Hash joins are the dominant join algorithm in modern database systems. 
Despite their high performance, they are not without weaknesses. 
In particular, duplicate key values can significantly degrade their performance. 
A [recent paper](https://madoc.bib.uni-mannheim.de/62365/1/p18-flachs.pdf) proposed the 3D hash join, which mitigates the issue of duplicate keys. 
This algorithm groups tuples that share keys into sub-lists within each hash table collision list. 
As this technique shows promise, we investigate it in a realistic join operator. 
Specifically, we combine the 3D algorithm with a hash join based on that of the [Umbra database](https://umbra-db.com/).

Unfortunately, the initial combination of these systems was not an improvement over the Umbra hash join. 
However, by estimating the number of unique keys and setting the hash directory size based on this value, we achieved up to a 77% speedup over the baseline.
Based on these results, we also present a technique for optimizing the hash directory size in a standard chained hash join. 
This method produces up to a 45% speedup over the baseline while reducing hash directory memory usage by 70%. 
In this paper, we describe the implementation of both techniques and show that they are potentially useful tools for mitigating the effects of duplicate keys in hash joins.

### Full Paper
[Practical Techniques for Hash Joins with Duplicate Keys](/assets/files/guided_research.pdf)
