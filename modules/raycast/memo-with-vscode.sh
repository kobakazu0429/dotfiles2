#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Memo with VSCode
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 📝

VSCODE_CMD=code
WORKING_DIR="$HOME/Documents/memo"
DEFAULT_FILE_NAME="$(date -u +%FT%TZ).md"

if [ ! -d ディレクトリ ]; then
  mkdir -p $WORKING_DIR
fi

code "$WORKING_DIR" "${WORKING_DIR}/${DEFAULT_FILE_NAME}"
