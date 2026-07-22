#!/usr/bin/env bash
set -euo pipefail

# GitHub receives the videos in sub-1 MB parts so the repository can be
# published through the connected API. Render reassembles the original MP4s
# before the production build runs.
chunks_dir="public/media/video-chunks"
videos_dir="public/media/videos"

if [[ ! -d "$chunks_dir" ]]; then
  exit 0
fi

mkdir -p "$videos_dir"
for first_part in "$chunks_dir"/*.part000; do
  [[ -e "$first_part" ]] || continue
  name="$(basename "$first_part" .part000)"
  cat "$chunks_dir"/"$name".part* > "$videos_dir/$name"
done
