<div id="sec-navigation"></div>
<div id="section-context"></div>

<div class="content">
<nav id="breadcrumb"><ul><li><a href="/" >home</a></li></ul></nav>

$=START_ARTICLE
$=FIRST_SECTION
#Authentication with Passport
$=START_SECTION_BODY

>"Passport is authentication middleware for Node.js. 
>Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. 
>A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more."
>(www.passportjs.org)


First to say, there is no need to use express. As I'am a flatiron-user, I figured out, that there is a 
[passport-module for flatiron](https://www.npmjs.com/package/flatiron-passport), too.

$=DIV+class=section-context
##packages
- [node-client-sessions](https://github.com/mozilla/node-client-sessions)     
_"secure sessions stored in cookies "_
- [expressjs/csurf](https://github.com/expressjs/csurf)     
_"CSRF token middleware "_

[passport-module for express](https://www.npmjs.com/package/passport)     
_"assport is Express-compatible authentication middleware for Node.js."_

[passport-module for flatiron](https://www.npmjs.com/package/flatiron-passport)     
_"Passport.js integration for FlatIron web framework.     
This package allows Flatiron.js applications to easily use the Passport.js authentication framework."_

##resources
[Passport Guide](http://passportjs.org/guide)    
Official user-guide

[Authenticating Node.js Applications With Passport](http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619)     
_"... use a relatively new but very popular authentication middleware - Passport to take care of our authentication concerns ..."_

[Everything You Ever Wanted To Know About Authentication in Node.js](https://www.youtube.com/watch?v=yvviEA1pOXw)

##else
[runJS: NodeJS](/co/runjs/article/nodejs)     
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV

$=NEXT_SECTION
#User Database
$=START_SECTION_BODY
For authentication with a so called 'local strategy' you need to store a user-profile - with at least username and pasword - on your server.
One possible solution should be levelDB and therefor the npm-package _level_, that means _levelup_ together with _leveldown_, 
but my first try on using it sucked :-(

Because I never used _levelup_ before, I checked out ["Level Me Up Scotty!"](https://github.com/rvagg/levelmeup) 
on [nodeschool.io](nodeschool.io).     
I had installed iojs 1.0.5 at that time and ended up reading install error messages concerning node-gyp and other crap like that.     
However, some tests with nodejs 0.10.25 succeeded, so I decided to put iojs away, until they have fixed that and to
go back to the "official" nodejs.


$=DIV+class=section-context
##packages
[level](https://www.npmjs.com/package/level)     
_"This is a convenience package that bundles the current release of LevelUP and LevelDOWN and exposes LevelUP on its export."_

##further
[nodeschool.io: levelmeup](https://github.com/rvagg/levelmeup)     
_"Level Me Up Scotty! An intro to Node.js databases via a set of self-guided workshops."_

##else
[runJS: NodeJS](/co/runjs/article/nodejs)     
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV

$=NEXT_SECTION
#Password encryption
$=START_SECTION_BODY
If we don't want to transport a password in plain text over the net we may compute a (md5) hash 
from the password and use that for transport, authentication and storage.

So one question is: Is this necessary or even a good idea and - if so - how can we compute a hash within the browser.

The answer to the if-question is: "it depends". If there is a "man in the middle", 
it might be easier to him, to use a detected password, if its not "uglyfied" as a hash, but if he knows, that this is the password-hash,
that is stored and used, it should make no huge difference.

To answer the how-question: there are a few libraries, that provide well-known crypto-algorithms, implemented in JavaScript.
The most popular seems to be [crypto-js](https://code.google.com/p/crypto-js/).

But if you really need transport-security, its best to use a end-to-end encryption like the built-in _secure socket layer_ (SSL, https).

Concerning the storage and the usage for authentication, maybe it is a good idea, to hash the password and
use the hash, to make it harder to spoof your site, but its still a security hole.

So, like I said, it depends. To achieve a normal "day by day" security, that makes it just harder for normal people, to read stuff, 
they are not supposed to, it may be a good compromise, to send plain passwords over the net and store their hashes.

$=DIV+class=section-context
##packages
[crypto](http://nodejs.org/api/crypto.html)     
built-in crypto package of nodejs

[bcrypt](https://www.npmjs.com/package/bcrypt)      
_"A bcrypt library for NodeJS."_

##libraries
[crypto-js](https://code.google.com/p/crypto-js/)     
_"JavaScript implementations of standard and secure cryptographic algorithms"_

##resources
[Client side hashing and encryption ](https://glynrob.com/javascript/client-side-hashing-and-encryption/)     
Javascript, Security by GlynRob • October 20, 2013

##else
[runJS: NodeJS](/co/runjs/article/nodejs)     
running JavaScript on the serverside

[runJS: Espruino](/co/runjs/article/espruino)    
running JavaScript as a native firmware

$=/DIV

$=STOP_ARTICLE

</div> <!-- /content -->
