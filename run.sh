#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l coservice.log -a $WDIR/server/run.js
