# Copy Email & Phone (Chrome Extension)

A lightweight Chrome extension that automatically copies email addresses and phone numbers when clicked. 

Includes a native-style toast notification near the element, with clean animation.

---

### Features
- Copies **tel:** links → outputs normalized phone numbers (keeps only digits and +)
- Copies **mailto:** links → outputs clean full email
- Beautiful blurred toast notification (macOS-like)
- Works on any website
- Zero configuration
- Zero tracking
- Open Source

---

### Install from Chrome Web Store
(Will update here once published)

---

### Local Installation (Unpacked)
```

1. Clone the repo
2. Open chrome://extensions/
3. Enable "Developer mode"
4. Click "Load Unpacked"
5. Select the project folder

```

---

### Code Structure
```

manifest.json            → Chrome extension settings (MV3)
scripts/hover-style.js   → Injects hover style; tags mailto/tel links
scripts/toast.js         → Toast notification utility
scripts/copy-logic.js    → Handles click-to-copy for mailto/tel
scripts/content-main.js  → Wires event listeners and bootstraps logic
icons/                   → Extension icons
LICENSE                  → MIT License

```

---

### License
MIT License.
