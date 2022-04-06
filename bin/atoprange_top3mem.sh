#!/bin/bash
for AF in atop/*
do
    DAY=$(echo $AF | cut -d_ -f2- )
    LINE=$(atopsar -r $AF -G | tail -2)
    echo $(($DAY+1)) $LINE
done