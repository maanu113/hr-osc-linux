#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
APP="$ROOT_DIR/target/release/hr-osc-tauri"

if [[ ! -x "$APP" ]]; then
  printf 'Binary not found: %s\nBuild it with: npm run tauri build\n' "$APP" >&2
  exit 1
fi

# Current CachyOS Wayland session needs the X11 backend for this WebKitGTK build.
exec env \
  GDK_BACKEND="${GDK_BACKEND:-x11}" \
  WEBKIT_DISABLE_COMPOSITING_MODE="${WEBKIT_DISABLE_COMPOSITING_MODE:-1}" \
  "$APP" "$@"
