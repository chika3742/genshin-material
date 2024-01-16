#!/bin/zsh

open "idea://open?file=$1&line=$2&column=$(($3 - 1))"
