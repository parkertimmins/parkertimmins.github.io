---
layout: post
title: Visualizing complex multiplication when using cartesian form 
excerpt: (a + bi)(c + di) = ac-bd + (ad + bd)i ... but what does this look like?
featured-img: "/assets/images/colorado_trail_banner_day.jpg"
---

Complex multiplication has always seemed a bit weird to me. I understand why complex numbers are useful, but the following equation just looks like symbols to me:

$$(a + bi)(c + di) = ac + adi + bci + bdi^2 = ac - bd + (ad + bc)i $$

The following is an attempt to get some intuition about the meaning behind these symbols.

Let's start by dispensing with the i-notation. As far as I'm concerned we're just working on a 2d plane. So using cartesian coordinates, the formula for complex multiplication now looks like: 
$$(a, b)(c, d) = (ac - bd, ad + bc)$$

But that's not much better, there must be some geometric interpretation to make sense of this way of doing multiplication 🤔.

Let's take a step back to the motivations for complex multiplication, at least from this user's perspective.

Complex multiplication provides a way to do rotations and expansions in a 2d plane.

So for example, the plane might represent locations on a map. You could be at the origin, and some complex number at (a, b) could represent another point on the map. A question you might ask is "If I'm facing towards the point (a, b), what point is directly to my left, but twice as far away as (a, b)?". This is easily achieved using a complex number to represent a 90° rotation and a 2x expansion; say this rotation and expansion number is (c, d). You would just multiply (c, d) time (a, b) to get the location of the new point. 
     It may seem strange that complex numbers can be used to represent both the location of a point, and how much to rotate the point. But numbers are flexible like that. We do this sort of thing with regular old real numbers all the time. For example if you eat 3 sandwiches 7 days a week and multiply to get 21 sandwiches, the 3 and 7 represent different types of things. In fact when you multiply, unless you're computing the area of something, you're probably using numbers to represent different types of things. So on the x-y plane, using a complex number to represent both a location and a rotation shouldn't feel that strange.

Okay, that's why we use complex multiplication. Now how do we get from this, to the formula: $$ (a, b)(c, d) = (ac - bd, ad + bc) $$ ?


Well first let's take another quick detour back to real numbers. How do you think about multiplication with real numbers?
Perhaps as repeated addition? Let's change to something a little different. 
Think about the multiplication of x and y, as taking each of the 1s that make up x, and replacing it with a y.
So for example, 3 times 4. 3 is made up of three 1s. Replace each of these 1s with a 4, giving you three 4s, and summing give you 12.

This is pretty much the same as repeated addition, just a slightly different way of thinking about it.

Let's look at that visually: 

We start with 3 1s:
💎&nbsp;&nbsp;💎&nbsp;&nbsp;💎

Then when 1 is replaced with 4, we get: 💎💎💎💎&nbsp;&nbsp;&nbsp;&nbsp;💎💎💎💎&nbsp;&nbsp;&nbsp;&nbsp;💎💎💎💎

and now you've got 12.


I'm sure that seems simple to the point of being very boring, but hopefully it'll serve as a useful analogy for how complex multiplication works.

So, let's apply this to complex multiplication. If you have two numbers (a, b) and (c, d) and we want multiply them, we do the same thing.
For every 1 in (a, b), we want to replace it with (c, d), and add those all together. But what is a 1 here? For real numbers, it's a single space on the number line. 

In the complex plane we still have the same 1 from the real axis, we can use it to add and subtract things horizontally. 

But we also need a 1-like thing for the vertical axis. What we have is i, it's very similar to 1: it's the same length, but it's perpendicular to our regular 1.

Since in the complex plane you can't get everywhere in the plane by just adding 1s (or you'd stay along the x-axis), we'll have to extend our "replacing 1s" method
to treat i's as 1s too. So we'll replace all 1-like things in the first complex number with the second complex number.


Let's try this "replace 1s" method. We'll multiply (a, b) and (c, d), but to make it easy we'll say that (a, b) is (3, 4) and (c, d) is (1, 2).

Following the "replace 1s" method we start by splitting (a, b) into "1"s and replace each one with an (c, d). Since a+bi is 3+4i, we break it apart
into three 1s and four i's. Or, thinking about the 2d plane, it's 3 horizontal 1s and 4 vertical "1"s. 

Let's start with replacing the regular horizontal 1s. This part is easy, the three 1s are now three (c, d)'s.

We're now living in a new world, where (c, d) is our 1.

Let's graph this. What would have been:

![1]({{site.baseurl}}/assets/images/posts/complex_multiply/0.gif){:height="500px" width="500px"}

is now:

![2]({{site.baseurl}}/assets/images/posts/complex_multiply/1.gif){:height="500px" width="500px"}

or, it might be easier to see if the segments representing the (c,d)s that replaced the 1s are shown as well:

![3]({{site.baseurl}}/assets/images/posts/complex_multiply/2.gif){:height="500px" width="500px"}


Now in this world, what is a vertical 1? Our horizontal 1 is no longer horizontal, it now follows a line thru (c, d). Back in the old world, the vertical 1 was just perpendicular to our
horizontal 1, and the same size. So if (c, d) is our "horizontal 1", what our new "vertical 1"?

Well if we rotate (c, d) by a quarter turn counter clockwise, we'll have what we want. But what number is that?

Let's look at the triangle formed by (0, 0), (c, d), and the x-axis. Then rotate the triangle up so that the bottom is now it's right side, which is touching the y-axis.

![4]({{site.baseurl}}/assets/images/posts/complex_multiply/3.gif){:height="500px" width="500px"}


The length on the top of this triangle is d, and the height is c. But since it's left of the y-axis, d is negative. So our new "vertical 1" is (-d, c).
(maybe we should stop calling it that since it's not vertical)

Okay so now that we have our new "vertical-ish 1", we can replace the old vertical 1s.
What used be 4i, now becomes 4 new-vertical-ish-1s, or 4(-d, c).

Let's add these to the plot. What used to be:

![5]({{site.baseurl}}/assets/images/posts/complex_multiply/4.gif){:height="500px" width="500px"}

is now:


![6]({{site.baseurl}}/assets/images/posts/complex_multiply/5.gif){:height="500px" width="500px"}


Hopefully this now explains the "replace 1s" method. Do you see the similarities between this visualization of complex multiplication, and the simpler real multiplication?


Now let's tie this back to the original question about the meaning behind the formula. Our result of replacing 1s was:

$$ 3(c, d) + 4(-d, c) $$

If we substitute back $$ a $$ for 3 and $$ b $$ for 4, we get:

$$ a(c, d) + b(-d, a) = (ac, ad) + (-bd, ba) = (ac - bd, ad + ba) $$

which was the original formula we were trying to make sense of.

We can see that each piece of the equation result shows up in the image below. The $$ ac $$ is all the green horizontal segments along the bottom orange segment, heading to the right. 
The $$ -bd $$ is all the green horizontal segments along the top orange segment, going back to the left. The $$ ad $$ and $$ bc $$ are the vertical segments along the bottom and top orange segment respectively; these two piece always head in the same direction, hence there is no negative sign.


Here's an interactive demonstation of multiplying two complex numbers. You can see how one of the number is made by repeating the
other number. You can drag the green and orange dots to change the numbers being multiplied. Push the button 
below to switch order of multiplication. You'll notice that the result is the same, no matter which number is having its 1s replaced and which is doing the replacing. This shouldn't
be surprising, since complex multiplication is commutative.

<div>
   <canvas id="canvas"></canvas> 
   <button id='swaporder'>Swap multiplication order</button>
   <script src="/assets/js/complex_multiplication.js"></script>
</div>

One final note. Look at the images to see how multiplication like this results in a rotation.
When making one of the numbers out of the other (by replacing 1s), we are stacking an expanded form of (a, b) on top of (c, d).
And this expanded form of (a, b) has the same angles as the smaller (a, b); so when the expanded (a, b) is stacked on (c, d), 
the result is that their angles at the origin stack on top of each each other and add up. The angle adding is rotation.


Hopefully this makes the formula for complex multiplication looks a bit less like symbol shuffling and provide some geometric intuition.

Thanks for reading!



