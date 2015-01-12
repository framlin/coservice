<div class="content">
<nav id="breadcrumb"><ul><li><a href="/">home</a></li></ul></nav>

$=START_ARTICLE
#Espruino

running JavaScript as a native firmware
$=FIRST_SECTION+class="no-boddy"
#What it is

Espruino is a board and a JavaScript-interpreter, that acts as firmware.
$=START_SECTION_BODY

$=NEXT_SECTION
#Espruio as a Board
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
In their promotion the makers of espruino designate it as IoJ (Internet of Javascript), targeting the hyped phrase IoT.
So the espruino has to be connected to the rest of the world especially the Internet.

Out of the Box the board has to be conected via USB with a PC. 
The board is a prototype-board, so there are many solderpoints 
to solder a [WIFI-](http://www.espruino.com/CC3000) or a [BLE-module](http://www.espruino.com/Bluetooth+BLE) onto the espruino 
and the builtin Javascript-library has the functionality to use this for wireless connections.

$=NEXT_SECTION
#Espruino as a JavaScript-Interpreter
$=START_SECTION_BODY

This interpreter knows a [subset of JavaScript](http://www.espruino.com/Reference#software). It is written in C and is designed to work with a very tiny amount of memory.
Espruino cames along with a Javascript-library, that enables one to acces every component of the board (e.g. th eLEDs and the buttons)

$=STOP_ARTICLE
</div> <!-- /content -->
