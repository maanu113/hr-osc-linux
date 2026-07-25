# HR-OSC

Heartrate OSC for VRChat

## Download

- [Latest Linux release](https://github.com/maanu113/hr-osc-linux/releases/latest)
- [All releases](https://github.com/maanu113/hr-osc-linux/releases)

Linux packages are provided as `.deb` and `.rpm` release assets. Download the
package matching your distribution and install it with your normal package
manager. On Arch/CachyOS, use the RPM package with `rpm` or extract/install it
according to your system's package workflow.

The launcher uses X11/XWayland and disables WebKit compositing by default for
compatibility with Linux WebKitGTK environments. Run `run-linux.sh` from a
checkout when using the unpackaged binary.

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
