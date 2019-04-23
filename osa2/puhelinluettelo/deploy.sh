#!/bin/sh
npm run build
rm -rf ~/Backend_puhluettelo/build
cp -r build ~/Backend_puhluettelo
