#!/bin/bash

root_dir=$1
previous_length=0

rm $root_dir/*.m3u
while IFS= read -r -d '' file; do
    file="${file/$root_dir\//}"
    if [[ $file == *.mp3 || $file == *.wav ]]; then
        spaces=$(printf '%*s' $((previous_length - ${#file})) "")
        previous_length=${#file}
        echo -ne "$file$spaces\r"

        subdir=$(dirname "$file")
        depth=$(echo "${file//[^\/]}" | wc -m)
        for level in $(seq 1 $depth); do
            level_subdir=$(echo $subdir | cut -d'/' -f1-$((level + 1)))
            subdir_playlist_name=$(echo $level_subdir | tr '/' '-')

            if [ "$level" -eq "$depth" ]; then
                echo "$file" >> "$root_dir/$subdir_playlist_name.m3u"
            fi

            if [ $(find "$root_dir/$level_subdir" -mindepth 1 -type d | wc -l) -gt 0 ]; then
                echo "$file" >> "$root_dir/$subdir_playlist_name-All.m3u"
            fi
        done
    fi
done < <(find "$root_dir" -type f -print0)

for playlist in $root_dir/*.m3u; do
    sort "$playlist" -o "$playlist"
done
