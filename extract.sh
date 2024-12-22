#!/bin/bash
PAGE=$1
NAME=$2
X="$3"
W="$4"
Y="$5"
DIR=$6;
FLAGS=$7;
if [ -z "$8" ]; then
    H=$((W * 25 / 70 ))
else
    H=$8;
fi
echo $FLAGS;
PDF_FILE=$DIR/main.pdf;
TMP_DIR=$DIR/tmp;
OUTPUT_FILE_PREFIX=$DIR/images/$NAME;


mkdir -p $TMP_DIR;
rm -f $TMP_DIR/*;
rm $OUTPUT_FILE_PREFIX.png;
pdftoppm -f $PAGE -l $PAGE -x $X -y $Y -W $W -H $H -png "$PDF_FILE" "$TMP_DIR/tmp.png"
find $TMP_DIR -type f -name "*.png" -exec mv {} "$OUTPUT_FILE_PREFIX.png" \;
echo extracted $OUTPUT_FILE_PREFIX.png
if [[ "$FLAGS" == *"green"* ]]; then
    convert $OUTPUT_FILE_PREFIX.png -fill green -fuzz 90% -opaque black $OUTPUT_FILE_PREFIX.g.png
    rm $OUTPUT_FILE_PREFIX.png
    mv $OUTPUT_FILE_PREFIX.g.png $OUTPUT_FILE_PREFIX.png
fi
if [[ "$FLAGS" == *"transparent"* ]]; then
    convert $OUTPUT_FILE_PREFIX.png -fuzz 20% -transparent white $OUTPUT_FILE_PREFIX.t.png
    rm $OUTPUT_FILE_PREFIX.png
    mv $OUTPUT_FILE_PREFIX.t.png $OUTPUT_FILE_PREFIX.png
fi
if [[ "$FLAGS" == *"openafter"* ]]; then
    code $OUTPUT_FILE_PREFIX.png
fi
# 
# 
# open $OUTPUT_FILE_PREFIX.g.png
