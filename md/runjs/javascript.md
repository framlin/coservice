<div id="sec-navigation"></div>
<div id="section-context"></div>

<div class="content">
<nav id="breadcrumb"><ul><li><a href="/" >home</a></li></ul></nav>

$=START_ARTICLE
$=FIRST_SECTION
#JavaScript
$=START_SECTION_BODY
As far as I know, JavaScript is the most used language - not only - in the web. 10 years ago, prior to "Web 2.0" 
and AJAX, that lead us to webapps, there was only a small number of books about JavaScript out here.     
This has changed dramatically and there is nothing, I could write more or better than any of these authors. I am pretty sure, there is a book, 
that fulfills your needs or your niche.

For those, that don't like books or don't want, to go to far into deep, this is a brief overview about the language. 

$=DIV+class=section-context
##else
[runJS: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV

$=NEXT_SECTION
#History
$=START_SECTION_BODY
20 Years ago, in 1995, Brendon Eich was hired by Netscape as a _scheme_ developer and was instructed, to develop an 
interpreted scripting-language, that should have a Java-like syntax and has to run embedded within Netscapes 
WWW-Browser Navigator.    
So he implemented JavaScript within 10 days in May 1995.

He designed "Mocha" - as it was named at first - as  a multi-paradigm language, 
that combines the object-oriented aspects, expressed by _self_ and the functional model of _scheme_.

_Self_ is inspired by _smalltalk_. It replaces the classes and the inheritance of _smalltalk_ with a 
prototype-based object model.   
_Scheme_ is a combination of the actor-model with the functional programming language _LISP_.

This paradigm-mixture, combined with the event-loop, that was inspired by _HyperCard/HyperTalk_, 
is - in my opinion - the reason for the success of the language.

$=DIV+class=section-context
##sources
[Computing Conversations with Brendan Eich](https://www.youtube.com/watch?v=IPxQ9kEaF8c)    
Brendan Eich, telling about the invention of JavaScript

[Crockford on JavaScript - Volume 1: The Early Years](https://www.youtube.com/watch?v=JxAXlJEmNMg)    
Crockford about the history of JavaScript and programming(-languages) at all.

##else
[runJS: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV

$=NEXT_SECTION
#basic building blocks
$=START_SECTION_BODY
JavaScript is a C-style-language. So it has common condition- and flow-structures, like for-loops, 
if-statements and so on, in a C-like-syntax. This is taken over from Java and it's dangerous, 
because not everything, that looks like a duck, behaves like a duck, as one can see looking at the 
keyword "this" or the scoping..  

JavaScript is a loosely typed language, that means, it has types, but they are dynamic. 
There are primitives, objects and functions, where functions are actual objects.
That's all.

The Primitives are: Number, Boolean, String, null and undefined.
They all - except null and undefined - have equivalent object-wrappers as builtin objects.
 
$=DIV+class=section-context
##sources
[Crockford on JavaScript - Chapter 2: And Then There Was JavaScript](https://www.youtube.com/watch?v=RO1Wnu-xKoY)     
Crockford about the basics of javaScript

##else
[runJS: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV


$=NEXT_SECTION
#Objects
$=START_SECTION_BODY

Besides the primitives, _objects_ are the only "things" JavaScript knows about.    
Objects are collections of **properties**, representing virtues by referencing other **objects**, 
and behaviour by pointing to **functions**.

Classes as e.g. used by Java, are descriptions, how objects are structured and how they behave. 
Such a description serves as a blueprint, to create and instantiate objects.     
To make classes reusable, it is possible to declare, that one class is derived from another and that it is inheriting
the virtue and behavior from the parent-class. 

JavaScript does *not* have such a class-concept. JavaScript has only "living" objects. You can create an object 
and change its properties dynamically at runtime. To target reusability, JavaScript relies 
on **delegation**, instead of inheritance. There are several ways, how to deal with this in detail. 
They use the dynamic nature of objects and/or the **prototype**-property, to reach  it. 

In combination with **closures**, it is possible, to express all the concepts 
(like modularisation, information hiding, reusability ....), that are known from OO-languages like Java, and more.

$=DIV+class=section-context
##sources
[Crockford on JavaScript - Chapter 2: And Then There Was JavaScript](https://www.youtube.com/watch?v=RO1Wnu-xKoY)     
Crockford about the basics of javaScript

##else
[runJS: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV

$=NEXT_SECTION
#Functions
$=START_SECTION_BODY

Functions in JavaScript are different, if you are used to the C-style function concept.
On the one hand, JavaScript-functions look and behave like "normal" functions.

<pre>
function foo(bla) {
	return bla;
}
var blubb = foo(42); //blubb == 42
</pre>

But on the other hand, they look and behave like normal objects - because they **are** normal objects

<pre>
function Thing(value) {
	this.kind = value;
}
var entity = new Thing(42); //entity.kind == 42
</pre>

This is, why I like to call JavaScript an 'object-functional' language. 

##this
"this" is the next different point. It refers not always to the object, a function _belongs to_, 
but depends on how a function is called. 

* for new "this" is a new created object 
* for function call "this" is global object
* for method call "this" is the object, the method belongs to

This makes JavaScript very flexible, but can be great in causing confusion, too.

##closures
The most important feature of JavaScript are closures. Closures are a kind of lexical (or static) scopes.
They enable functions, to give their static environment a private piggyback ride. 
This is a very useful feature particularly for callbacks, a central element within the *event-driven* runtime-concept.  
Closures are used to realize the module pattern, too.

$=DIV+class=section-context
##sources
[Crockford on JavaScript - Act III: Function the Ultimate](https://www.youtube.com/watch?v=ya4UHuXNygM)     
Crockford about functions, constructors, closures and related coding styles
##further
[Speaking JavaScript: An In-Depth Guide for Programmers](http://speakingjs.com/)     
Dr. Axel Rauschmayer

[nodeschool: Functional Javascript](https://github.com/timoxley/functional-javascript-workshop)     
Learn fundamental functional programming features of JavaScript in vanilla ES5.

* Functional Programming by Martin Fowler (Youtube/Twitter 31.1.2015)
##else
[runJS: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV


$=NEXT_SECTION
#ES6, the future
$=START_SECTION_BODY

$=DIV+class=section-context
##else
[runJS: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV

$=STOP_ARTICLE

</div> <!-- /content -->
