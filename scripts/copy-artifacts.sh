#!/bin/bash

rm -rf ./dist/

mkdir -p ./dist/

for d in packages/*/; do
  packageName=`basename $d`

  if [ -d "$d/dist" ]; then
    echo "Copying artifacts for $packageName"
    cp -r "$d/dist" "./dist/$packageName"     
  fi
done