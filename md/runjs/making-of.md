<div id="sec-navigation"></div>
<div id="section-context"></div>

<div class="content">
<nav id="breadcrumb"><ul><li><a href="/">home</a></li><li>| nxmaking-of</li></ul></nav>

$=START_ARTICLE
#Making-of
how and why the framlin web farm is built
$=FIRST_SECTION
#Motivation
$=START_SECTION_BODY
I am a passionate software developer and I like to look at and play around with the
different approaches and technologies, used within my fields of interest.

Because I am a professional, too, not all the stuff, I produce during the days, is done in a way, that respects my
curiosity and fun on new techniques and technologies.      
So I use my "web presence" not only to inform the public 
about me (resume) and my profession (projects/customers), but to have a playground and a fun-side-project, too.

My first website (2005) started as a bunch of XML- and CSS-Files, that have been transformed to a static website via XSLT.
There was no line of script-code neither on the server nor the client.
Currently (2015), there are different domains, that belong together, driven by a bunch of Node.JS-servers and
 _jQuery_ on the client.

$=NEXT_SECTION
#Technology
$=START_SECTION_BODY
Since 2010, when Node.JS was created by Ryan Dahl, there is no need any more, to use different languages 
on the client and the server. So one of the "principles", my current implementation is following, 
is to code everything - on both sides - in HTML5/CSS3 and JavaScript.
$=NEXT_SECTION
#Architecture
$=START_SECTION_BODY
The idea behind the current architecture was inspired by some videos and podcasts, about _microservices_, that I consumed
the last months.       

Behind a proxy, there are some webservers, each serving one domain. 
Their main task is to route the http-requests to a couple of services and to glue their results together.
      
<img class="big" src="/co/runjs/images/making-of-architcture-toplevel"/>

There is a service for (css) styles, images  and framing html snippets, that represent the CI of the channel 
or the layout and styling of each site.     
One service holds all the general content, other services are responsible for particular realms like my CV and my projects,
poems, recipes, bookmarks etc.     

All nodes are connected through streams, that pipe the requests down to the services 
and the resulting markup-pieces back to the webservers.
They merge the snippets together and provide the browser with a (mostly) static html-page.


$=NEXT_SECTION
#Routing
$=START_SECTION_BODY
All framlin sites are currently hosted together on one physical server, with serveral domains pointing to it.
All webservers and services are each listening on its own port. 
There is a json-configuration-file, that maps domain- and servicenames to ports.

The first point, that incoming requests have to pass, is a _node-proxy_, that knows the port-mapping and forwards the requests 
to the webserver, that is responsible for the passed domain.

Each websever is a _flatiron_-server and has a routing-component, that forwards to a _builder_, that knows,
what services to call on which port and how to glue their results together. (there is no serious reason, why i use flatiron instead of express)        
Because it's nearly the same for all websevers, there is a Node.JS-module called _fr-routing_, that implements this 
and that all webserver-routers inherit from.
The router itself is delegating to _director_, the routing-middleware of _flatiron_, to access 
the various request- and response-streams.

All URLs, the routing-system does not know about, are supposed to be static files, that are stored 
within the "root-directory" of the webserver and are therefor passed to _ecstatic_, a middleware, 
that implements a static-file-server.

$=DIV+class=section-context
##packages
<pre>
  fr-server => "dependencies": {
    "director": "^1.2.3",
    "ecstatic": "^0.5.6",
    "flatiron": "^0.4.2",
    "restify": "^2.8.3",
    "union": "^0.4.3"
  },
</pre>
##further
 - Node.JS - middleware /connect / express
$=/DIV

$=NEXT_SECTION
#Page Building
$=START_SECTION_BODY
Pages, that are part of the framlin websites, are composed from several partials. There are headers, footers and menus, 
that surround a main content part.     
From the markup point of view, such pages follow the HTML5-article/section-concept.

The builders are responsible to construct this pages. They request the partials from the services, that provide them and 
glue the partial-streams together, using a _through-stream_.     
The combined streams are piped back to the router and further to the browser.

Each webserver has such a builder and as with the routing, there is a Node.JS-module called _fr-builder_,
that implements the shared functionality and that all "private" server-builders inherit from.

To achieve a "RESTful" URL-style, the URIs do not have suffixes like .html or .png.     
If the services, that deliver the partials or single media-files like images or audio,  would be *really* _restful_, 
they would provide content negotiation, but - as a first step - there are
hardcoded suffixes appended to to requested URLs.

$=DIV+class=section-context
##packages
- event-stream
$=/DIV

$=NEXT_SECTION
#Content Acquisition
$=START_SECTION_BODY
As I am a developer, my favourite data-input-tool is my IDE, or any kind of texteditor, so I do not want to have any 
embedded web-editor, or a edit-mode, like a wiki has.

The services are streaming html files directly from the disk. So one possibility would be, to create and edit the html-files 
themself, but that's not my preferred way.    
Instead of "coding" html-files, I use markdown, that is "pimped" with the ability to insert "macros", that
reduce the amount of html-tags by combining several tags within one "keyword" 
<pre>
e.g $=NEXT_SECTION --&gt; &lt;/section&gt;&lt;section&gt;&lt;header&gt;
</pre>

The macros are expanded by a Node.JS-app called _mdprocessor_, and are passed to the mdoule _showdown_, 
that produces the resulting html markup.

$=DIV+class=section-context
##packages
- showdown

$=/DIV
$=NEXT_SECTION
#UI Augmentation
$=START_SECTION_BODY
The pages are designed under the terms of "reactive webdesing" and follow the "mobile first" principle.
If the pages are presented by a small mobile-device, or a browser, that has no JavaScript running, all information is
embedded within a centered _section_, encapsulated by a div of class _section-context_.

If the viewport is broad enough, the section-context of an "active" section will be displayed separate in its own div, 
next to the section, always viewed at the same (static) position.     
If another section becomes "active", the context of this section is displayed instead.

The second thing, that is augmented, if there is enough space, is a section-menu.      
This shows all section-titles of the current article, where the sections, that are visible at the moment, are highlighted and the
"active" section-title is printed in red.

What section is "active", is determined by its position within the viewport or by a user-click.

All _DOM_-manipulation stuff is done using _jQuery_
$=NEXT_SECTION
#Searching - Indexing
$=START_SECTION_BODY
static site index using norch
$=DIV+class=section-context
##packages
[norch](https://www.npmjs.com/package/norch)     
_"A search engine based on Node.js and LevelDB"_
$=/DIV

$=STOP_ARTICLE

</div> <!-- /content -->
