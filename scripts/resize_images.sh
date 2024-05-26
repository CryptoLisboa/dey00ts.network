#!/bin/bash

input_dir="$1"
output_dir="$2"

if [ -z "$input_dir" ] || [ -z "$output_dir" ]; then
  echo "Usage: $0 <input_dir> <output_dir>"
  exit 1
fi

find "$input_dir" -type f -iname "*.png" | while read file; do
  relative_path="${file#$input_dir/}"
  output_file="$output_dir/$relative_path"
  output_dir_path=$(dirname "$output_file")
  mkdir -p "$output_dir_path"
  sips -Z 500 "$file" --out "$output_file"
done