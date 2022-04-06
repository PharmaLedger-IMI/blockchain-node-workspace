#!/bin/bash
#export ATOPR=""
#ATOPR=$(ls -1 atop/* | sort -r | while read R ; do echo "-r $R" ; done)
#ATOPR=atop/*
#ATOPR1=$(ls -1 atop/* | sort -r | head -1)
#eval atopsar -r $ATOPR
echo YYYUMMDD SWPFREE
for AF in atop/*
do
    DAY=$(echo $AF | cut -d_ -f2- )
    #atopsar -r $AF -m -R 160
    LINE=$(atopsar -r $AF -m -R 160 | grep "^0.:.*M$")
    SWAPFREE=$(echo $LINE | awk '{print $9}')
    echo $DAY $SWAPFREE
    # | read TIME MEMTOTAL FREE BUFFERS CACHED DIRTY SLABMEM SWPTOTAL SWPFREE ; echo $SWPFREE
done