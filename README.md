# HR-OSC

Heartrate OSC for VRChat

## Download

[Release](https://github.com/kamyu1537/hr-osc/releases)

## Linux build

Linux builds use Tauri 2 and WebKitGTK 4.1. On Arch Linux, install the
`webkit2gtk-4.1` package, then run:

```bash
npm ci
npm run tauri build
```

The generated packages are written to `src-tauri/target/release/bundle/`.

## Usage

### VRChat

- [Notion](https://savory-advantage-23c.notion.site/OSC-HeartRate-in-Avatar-3-0-5a61198e60054852be904d165b3791ea)

### Stromno or Pulsoid

- [Arcalive](https://arca.live/b/vrchat/48279885)

### HTTP

```bash
curl -X POST -d '60' http://localhost:8080
```
