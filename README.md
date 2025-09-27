# CyberInject 🛡️

**Professional Security Testing Toolkit**

A comprehensive browser extension designed for authorized security testing and penetration testing activities. CyberInject provides quick access to common security payloads across multiple vulnerability categories.

<img width="1024" height="554" alt="CyberInjectReduced" src="https://github.com/user-attachments/assets/190327a4-efeb-4b86-93d3-65d7ba40f3ba" />

![Version](https://img.shields.io/badge/version-1.2.0-red)
![License](https://img.shields.io/badge/license-MIT-blue)
![Security](https://img.shields.io/badge/use-authorized%20only-orange)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-brightgreen)](https://chromewebstore.google.com/detail/cyberinject/dgnnpllamcglhcfmppgijeindohkkabm)

## ⚠️ Important Disclaimer

**THIS TOOL IS FOR AUTHORIZED SECURITY TESTING ONLY**

- Only use on systems you own or have explicit written permission to test
- Unauthorized use may violate laws and regulations
- Users are solely responsible for compliance with applicable laws
- Always obtain proper authorization before conducting security assessments

## 🚀 Features

### Vulnerability Categories

- **XSS (Cross-Site Scripting)** - 15 payloads
  - Basic script alerts
  - Image error handlers
  - SVG-based injections
  - JavaScript protocols
  - Iframe exploits
  - Encoded string bypasses

- **SQL Injection** - 15 payloads
  - Authentication bypasses
  - Union-based injections
  - Comment-based bypasses
  - Time-based blind injections
  - Table enumeration
  - Error-based techniques

- **SSRF (Server-Side Request Forgery)** - 12 payloads
  - Localhost access attempts
  - Internal service targeting
  - Cloud metadata endpoints
  - File protocol exploitation
  - Network interface probing

- **LFI (Local File Inclusion)** - 12 payloads
  - Path traversal attacks
  - System file access
  - Process environment disclosure
  - Platform-specific targets
  - PHP filter exploitation

- **Other Vulnerabilities** - 15 payloads
  - Template injection
  - Command injection
  - Open redirects
  - Debug parameter exposure
  - Directory traversal

### User Experience

- **One-Click Copy** - Click any payload card to copy to clipboard
- **Tabbed Interface** - Organized categories for easy navigation
- **Keyboard Shortcuts** - Use keys 1-5 to switch between categories
- **Visual Feedback** - Success/error notifications and animations
- **Responsive Design** - Optimized for browser extension popup
- **Professional UI** - Clean, modern interface with red security theme

## 🛠️ Installation

### Quick Install - Chrome Web Store

**🚀 Get CyberInject instantly from the Chrome Web Store:**

Install from Chrome Web Store

1. Visit the [CyberInject Chrome Web Store page](https://chromewebstore.google.com/detail/cyberinject/dgnnpllamcglhcfmppgijeindohkkabm)
2. Click "Add to Chrome"
3. Confirm the installation
4. Look for the CyberInject icon in your browser toolbar

### Quick Install - Firefox Add-ons

**🦊 Get CyberInject instantly from Firefox Add-ons:**

1. Visit the [CyberInject Firefox Add-ons page](https://addons.mozilla.org/en-US/firefox/addon/cyberinject/)
2. Click "Add to Firefox"
3. Confirm the installation
4. Look for the CyberInject icon in your browser toolbar

**Compatible with:**
- Google Chrome
- Microsoft Edge
- Firefox
- Brave Browser
- Any Chromium-based browser

### From Source (Advanced Users)

1. Clone the repository:
```bash
git clone https://github.com/CyberNilsen/CyberInject.git
cd cyberinject
```

2. Load in Chrome/Edge:
   - Open `chrome://extensions/` or `edge://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project directory

3. Load in Firefox:
   - Open `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select `manifest.json`

### Extension Structure

```
cyberinject/
├── manifest.json          # Extension manifest
├── popup.html            # Main popup interface
├── popup.js              # Core functionality
├── popup.css             # Styling and themes
├── icons/                # Extension icons
│   └── CyberInjectLogo.png
└── README.md             # This file
```

## 📱 Usage

1. **Access the Extension**
   - Click the CyberInject icon in your browser toolbar
   - The popup will display with all payload categories

2. **Navigate Categories**
   - Click tabs at the top to switch between vulnerability types
   - Use keyboard shortcuts (1-5) for quick navigation

3. **Copy Payloads**
   - Click any payload card to copy it to your clipboard
   - Visual confirmation shows when copy succeeds
   - Paste the payload into your testing target

4. **Keyboard Shortcuts**
   - `1` - XSS payloads
   - `2` - SQL Injection payloads
   - `3` - SSRF payloads
   - `4` - LFI payloads
   - `5` - Other vulnerabilities
   - `Esc` - Close popup (browser dependent)

## 🔧 Technical Details

### Core Components

- **CyberInject Class** - Main application controller
- **Tab Navigation** - Category switching system
- **Clipboard Management** - Cross-browser copy functionality
- **Notification System** - User feedback and status updates
- **Keyboard Handler** - Shortcut key processing

### Browser Compatibility

- ✅ Chrome/Chromium (via Chrome Web Store)
- ✅ Microsoft Edge (via Chrome Web Store)
- ✅ Brave Browser (via Chrome Web Store)
- ✅ Firefox (manual installation)
- ✅ Safari (with manifest adjustments)

### Security Features

- No external network requests
- Local clipboard access only
- No data persistence or tracking
- Minimal permissions required
- Chrome Web Store security reviewed

## 🎨 Customization

### Adding New Payloads

1. Edit `popup.html` to add new payload cards:
```html
<div class="payload-card" data-payload='YOUR_PAYLOAD_HERE'>
    <div class="payload-header">
        <h3 class="payload-name">Payload Name</h3>
        <div class="copy-button">📋</div>
    </div>
    <code class="payload-code">YOUR_PAYLOAD_HERE</code>
    <div class="payload-description">Description of the payload</div>
</div>
```

2. The JavaScript will automatically handle the new payload

### Styling Modifications

- Edit `popup.css` to customize colors, fonts, and layout
- CSS variables at the top of the file control the theme
- Responsive design adapts to different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add new XSS payload"`
5. Push to your fork: `git push origin feature-name`
6. Submit a pull request

### Contribution Guidelines

- Only add payloads for legitimate security testing
- Include clear descriptions for new payloads
- Test across multiple browsers
- Follow existing code style and structure
- Update documentation as needed

## ⭐ Support the Project

If you find CyberInject useful for your security testing work:

- ⭐ **Star this repository** on GitHub
- 📝 **Rate and review** on the [Chrome Web Store](https://chromewebstore.google.com/detail/cyberinject/dgnnpllamcglhcfmppgijeindohkkabm)
- 🐛 **Report issues** to help improve the tool
- 🚀 **Share with fellow security researchers**

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## ⚖️ Legal Notice

This tool is intended solely for authorized security testing and educational purposes. Users must:

- Obtain explicit written permission before testing any systems
- Comply with all applicable laws and regulations
- Use responsibly and ethically
- Not use for malicious purposes

The developers assume no liability for misuse of this tool.

## 📞 Support & Links

- 🛒 **Chrome Web Store:** [Install CyberInject](https://chromewebstore.google.com/detail/cyberinject/dgnnpllamcglhcfmppgijeindohkkabm)
- 🐛 **Report Issues:** [GitHub Issues](https://github.com/CyberNilsen/CyberInject/issues)
- 💡 **Feature Requests:** [GitHub Issues](https://github.com/CyberNilsen/CyberInject/issues)
- 📖 **Documentation:** [GitHub Wiki](https://github.com/CyberNilsen/CyberInject/wiki)
- 📧 **Contact:** cyberbrothershq@gmail.com

---

**Remember: With great power comes great responsibility. Use CyberInject ethically and legally.**

*Available now on the Chrome Web Store - Get instant access to professional security testing payloads!*
