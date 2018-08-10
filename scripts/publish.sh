#!/bin/bash

for d in dist/*/; do
  packageName=`basename $d`

  echo "Deploying $packageName"

  npm publish "$d" --access public 
done