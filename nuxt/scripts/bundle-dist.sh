#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "version not set"
  exit 1
fi

yarn generate:native

(cd dist_native; zip -r ../genshin-material_$1.zip .)
