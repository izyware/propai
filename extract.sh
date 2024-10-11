#!/bin/bash
PAGE=$1
NAME=$2
X="$3"
W="$4"
Y="$5"
DIR=$6;
PDF_FILE=$DIR/main.pdf;
OUTPUT_FILE_PREFIX=$DIR/images/$NAME;
H=$((W * 25 / 70 ))
pdftoppm -f $PAGE -l $PAGE -x $X -y $Y -W $W -H $H -png "$PDF_FILE" "$OUTPUT_FILE_PREFIX"
mv $OUTPUT_FILE_PREFIX-$PAGE.png $OUTPUT_FILE_PREFIX.png
echo $OUTPUT_FILE_PREFIX.png
convert $OUTPUT_FILE_PREFIX.png -fill green -fuzz 90% -opaque black $OUTPUT_FILE_PREFIX.g.png
convert $OUTPUT_FILE_PREFIX.g.png -fuzz 20% -transparent white $OUTPUT_FILE_PREFIX.t.png
open $OUTPUT_FILE_PREFIX.g.png
