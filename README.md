<div align="center">

# YourFav

**Instant favicon generator — one image, every size.**

Upload any image, pick your sizes, and download a complete favicon package with integration code.

[Live Demo](https://wafarifki.github.io/YourFav/index.html) · [Report Bug](https://github.com/wafarifki/yourfav/issues) · [Request Feature](https://github.com/wafarifki/yourfav/issues)

</div>

---

## Features

- **Drag & Drop Upload** — supports PNG, JPG, WEBP, GIF, SVG, BMP, TIFF, HEIC, ICO
- **14 Favicon Sizes** — from 16×16 to 512×512 + SVG scalable (Apple Touch, Android, PWA, Microsoft Tiles)
- **One-Click ZIP** — bundled with `favicon.svg`, `favicon.ico`, `site.webmanifest`, and `browserconfig.xml`
- **Integration Code** — copy-paste HTML tags for your project
- **Customizable** — app name, theme color, background color, favicon path
- **Responsive** — works on desktop and mobile
- **No Backend** — runs entirely in the browser

## Supported Sizes

| Size | File | Use Case |
|------|------|----------|
| 16×16 | `favicon-16x16.png` | Browser tab |
| 32×32 | `favicon-32x32.png` | Retina tab |
| 48×48 | `favicon-48x48.png` | Windows icon |
| 70×70 | `mstile-70x70.png` | MS small tile |
| 96×96 | `favicon-96x96.png` | Google TV |
| 128×128 | `favicon-128x128.png` | Chrome Web Store |
| 144×144 | `mstile-144x144.png` | Windows tile |
| 150×150 | `mstile-150x150.png` | MS medium tile |
| 152×152 | `apple-touch-icon-152x152.png` | iPad |
| 180×180 | `apple-touch-icon.png` | Apple Touch |
| 192×192 | `android-chrome-192x192.png` | Android |
| 310×310 | `mstile-310x310.png` | MS large tile |
| 512×512 | `android-chrome-512x512.png` | PWA splash |
| SVG | `favicon.svg` | Scalable vector |

## ZIP Output

```
favicon/
├── favicon.svg
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── favicon.ico
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── mstile-*.png
├── site.webmanifest
└── browserconfig.xml
```

## Getting Started

### Usage

1. Open `index.html` in your browser
2. Drag & drop an image (or click to browse)
3. Select favicon sizes
4. Customize settings (optional)
5. Click **Generate**
6. Download the ZIP and copy the integration code

### Self-Hosted

```bash
# Clone the repository
git clone https://github.com/wafarifki/yourfav.git

# Open in browser
cd yourfav
open index.html
```

No build tools, no dependencies to install. Pure HTML, CSS, and JavaScript.

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, `color-mix()`, animations
- **Vanilla JavaScript** — no framework
- [JSZip](https://github.com/Stuk/jszip) — ZIP file creation
- [FileSaver.js](https://github.com/eligrey/FileSaver.js) — file download
- [heic2any](https://github.com/alexcorvi/heic2any) — HEIC conversion

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 66+ |
| Firefox | 57+ |
| Safari | 11.1+ |
| Edge | 79+ |

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Author

**Wafa Rifqi Anafin**
- Website: [wafarifki.com](https://wafarifki.com)
- GitHub: [@wafarifki](https://github.com/wafarifki)

---

<div align="center">
Made with ❤️ by <a href="https://wafarifki.com">Wafa Rifqi Anafin</a>
</div>