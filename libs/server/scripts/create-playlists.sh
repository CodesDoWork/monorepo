#!/bin/bash

root_dir=$1

declare -A audio_files

while IFS= read -r -d '' file; do
    if [[ $file == *.mp3 || $file == *.wav ]]; then
        subdir=$(dirname "$file")
        subdir_path=$(echo $subdir | cut -d'/' -f2-)
        subdir_name=$(echo $subdir | cut -d'/' -f2)
        if [[ ! -v audio_files["$subdir_name"] ]]; then
            audio_files["$subdir_name"]="$root_dir/$subdir_name.m3u"
			rm "${audio_files["$subdir_name"]}"
            touch "${audio_files["$subdir_name"]}"
        fi
        echo "$file" >> "${audio_files["$subdir_name"]}"
    fi
done < <(find "$root_dir" -type f -print0)
