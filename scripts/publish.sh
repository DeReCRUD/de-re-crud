#!/bin/bash

for d in dist/*/; do
  packageName=`basename $d`

  echo "Deploying $packageName"

  cd "$d"
  npm publish --access public 
done