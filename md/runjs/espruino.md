<div id="sec-navigation"></div>
<div id="section-context"></div>


<div class="content">
<nav id="breadcrumb"><ul><li><a href="/">home</a></li></ul></nav>
<div class="banner">

$%&
#Espruino

running JavaScript as a native firmware

</div>

$=START_ARTICLE
$=FIRST_SECTION+class="no-boddy"
#What it is

Espruino is a board and a JavaScript-interpreter, that acts as firmware.
$=START_SECTION_BODY

$=NEXT_SECTION
#A Board
a tiny [board](http://www.espruino.com/EspruinoBoard) with the Espruino-Runtime preinstalled.
$=START_SECTION_BODY

##Specs:
- ARM Cortex M3-CPU / 72 MHz from STM32
- 48 KB RAM 
- 256 KB Flash-Memory
- three LEDs (red, green, blue)
- two buttons
- battery-plug JST, 2 Pins
- Micro-SD-Card-Slot

##Connection
In their promotion the makers of espruino designate it as JavaScript for things, targeting the ongoing IoT-hype.
So the espruino has to be connected to the rest of the world especially the Internet.

Out of the Box the board has to be conected via USB with a PC. 
The board is a prototype-board, so there are many solderpoints 
to solder a [WIFI-](http://www.espruino.com/CC3000) or a [BLE-module](http://www.espruino.com/Bluetooth+BLE) onto the espruino 
and the builtin Javascript-library has the functionality to use this for wireless connections.



$=DIV+class=section-context
##sources
[Espruino - JavaScript ganz weit unten](http://www.heise.de/hardware-hacks/artikel/Espruino-JavaScript-ganz-weit-unten-2132781.html)    
"Heise" Article about Espruino (german)

[Javascript for Things with Espruino](https://www.youtube.com/watch?v=vqd_uFFf5Zs)

[Javascript for Things with Espruino and Orion](https://www.youtube.com/watch?v=fAslTMXUVrI)    

[Gordon Williams: Espruino - JavaScript for Things - Great British Node Conf](https://www.youtube.com/watch?v=lrJJQ1uW3lA)


[Espruino hard- and software reference](http://www.espruino.com/Reference)

##further
[runjs: JavaScript](/co/runjs/article/javascript)    
Some general words about JavaScript

[runjs: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside
$=/DIV

$=NEXT_SECTION
#CC3000
$=START_SECTION_BODY
##Connection Pinout

<table id="cc3000-connection-pinout">
<thead>
<tr>
<th>CC3000</th>
<th>Espruino</th>
</tr>
</thead>
<tbody>
<tr>
<td>GND</td>
<td>GND</td>
</tr>
<tr>
<td>3v3</td>
<td>Do not use</td>
</tr>
<tr>
<td>VIN</td>
<td>VBAT</td>
</tr>
<tr>
<td>CLK/SCK</td>
<td>B3</td>
</tr>
<tr>
<td>DOUT/MISO</td>
<td>B4</td>
</tr>
<tr>
<td>DIN/MOSI</td>
<td>B5</td>
</tr>
<tr>
<td>CS</td>
<td>B6</td>
</tr>
<tr>
<td>EN/VBEN</td>
<td>B7</td>
</tr>
<tr>
<td>IRQ</td>
<td>B8</td>
</tr>
</tbody>
</table>

##hello world
<pre>
var wlan = require("CC3000").connect();

wlan.connect( "AccessPointName", "WPA2key", function onConnect(s) { 

  if (s=="dhcp") {
    console.log("My IP is "+wlan.getIP().ip);
    require("http").createServer(function onRequest(req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello World');
      res.end();
    }).listen(80);
  }
});</pre>

<pre>
Disconnected
>
Connected
>
=undefined
>
=undefined
>
=undefined
>reset();
=undefined
 _____                 _
|   __|___ ___ ___ _ _|_|___ ___
|   __|_ -| . |  _| | | |   | . |
|_____|___|  _|_| |___|_|_|_|___|
          |_| http://espruino.com
 1v72 Copyright 2015 G.Williams
>echo(0);
=undefined
My IP is 192.168.188.89
</pre>

<pre>
Hello World
</pre>
$=DIV+class=section-context
##sources
[CC3000 WiFi Module](http://www.espruino.com/CC3000)

[Espruino Internet (HTTP)](http://www.espruino.com/Internet)

[Adafruit CC3000 Tutorial](https://learn.adafruit.com/adafruit-cc3000-wifi)

[Adafruit CC3000 Product Page](http://www.adafruit.com/products/1469)
$=/DIV
$=NEXT_SECTION
#A JavaScript-Interpreter
$=START_SECTION_BODY

This interpreter knows a [subset of JavaScript](http://www.espruino.com/Reference#software). It is written in C and is designed to work with a very tiny amount of memory.
Espruino cames along with a Javascript-library, that enables one to acces every component of the board (e.g. th eLEDs and the buttons)
$=DIV+class=section-context
##sources
[Espruino - JavaScript ganz weit unten](http://www.heise.de/hardware-hacks/artikel/Espruino-JavaScript-ganz-weit-unten-2132781.html)    
"Heise" Article about Espruino (german)

[Javascript for Things with Espruino](https://www.youtube.com/watch?v=vqd_uFFf5Zs)

[Javascript for Things with Espruino and Orion](https://www.youtube.com/watch?v=fAslTMXUVrI)    

[Gordon Williams: Espruino - JavaScript for Things - Great British Node Conf](https://www.youtube.com/watch?v=lrJJQ1uW3lA)


[Espruino hard- and software reference](http://www.espruino.com/Reference)

##further
[runjs: JavaScript](/co/runjs/article/javascript)    
Some general words about JavaScript

[runjs: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside
$=/DIV

$=NEXT_SECTION
#Espruino for education
$=START_SECTION_BODY

grafical coding within web-ide

$=DIV+class=section-context
##sources
[Javascript for Things with Espruino](https://www.youtube.com/watch?v=vqd_uFFf5Zs)
##further
[runjs: JavaScript](/co/runjs/article/javascript)    
Some general words about JavaScript

[runjs: NodeJS](/co/runjs/article/nodejs)   
running JavaScript on the serverside
$=/DIV


$=STOP_ARTICLE

<div class="clearit"/>
</div> <!-- /content -->
