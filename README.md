# RIFT Official Website

The official website for **RIFT (Rapid Integrated Framework Technology)** - a modern programming language that enables dramatically more output with dramatically less code.

## 🌐 Website Structure

### Pages

- **`index.html`** - Homepage with hero, quickstart, language pillars, and visualizations
- **`compare.html`** - Language comparison tool with metrics and filters
- **`install.html`** - Installation guide with terminal animations
- **`docs-lite.html`** - Documentation with sidebar navigation
- **`why-rift.html`** - Philosophy and technical manifesto
- **`showcase.html`** - Featured projects and starter templates
- **`community.html`** - Contribution guidelines and governance
- **`performance.html`** - Performance discussion and methodology

### Assets

- **`/assets/css/styles.css`** - Custom CSS with themes, animations, and terminal effects
- **`/assets/js/main.js`** - Vanilla JavaScript for interactivity
- **`/assets/js/data.js`** - Language comparison data

## 🎨 Design System

### Aesthetic
- **Modern Enterprise Minimalism** - Clean, confident, restrained
- **Developer/Coder Aesthetic** - Precise, metrics-focused, code-first
- **Terminal & Systems Flavor** - Scanlines, grids, prompts, CLI-driven

### Features
- Light + dark theme support with localStorage persistence
- Syntax highlighting for RIFT code
- Terminal typing animations
- IntersectionObserver-based reveal animations
- Responsive design (mobile, tablet, desktop)
- Reduced motion support for accessibility

## 🛠️ Technical Stack

- **HTML5** - Semantic markup
- **Tailwind CSS CDN** - Utility-first CSS framework
- **Custom CSS** - Extensive styling system with CSS variables
- **Vanilla JavaScript** - No frameworks or dependencies
- **Static Site** - No build tools, no server-side logic

## 🚀 Local Development

### Serving the Site

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### File Structure

```
RIFT-SITE/
├── index.html              # Homepage
├── compare.html            # Language comparisons
├── install.html            # Installation guide
├── docs-lite.html          # Documentation
├── why-rift.html          # Philosophy
├── showcase.html          # Projects showcase
├── community.html         # Community & governance
├── performance.html       # Performance discussion
├── assets/
│   ├── css/
│   │   └── styles.css     # Custom styles
│   └── js/
│       ├── main.js        # Core functionality
│       └── data.js        # Comparison data
├── SYNTAX.md              # Language specification
├── install.sh             # Installation script
└── uninstall.sh           # Uninstall script
```

## 📝 Content Guidelines

### Code Examples
- All RIFT code examples are sourced from `SYNTAX.md`
- No invented syntax or features
- Real, executable examples only

### Metrics
- No fake download counts or star numbers
- Focus on code reduction metrics (lines, characters)
- Honest disclaimers for performance claims

### Tone
- Calm, technical, confident
- Precise language, no hype
- Developer-respectful
- Concrete comparisons over vague claims

## 🎯 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers
- Reduced motion support via `prefers-reduced-motion`

## 🔒 Security

- Static site with no server-side execution
- No user data collection or storage
- External scripts limited to Tailwind CDN
- All user interactions are client-side only

## 📄 License

MIT License - See individual files for details.

## 🤝 Contributing

Contributions welcome! See `community.html` for:
- Contribution guidelines
- Code of conduct
- Governance model
- Development roadmap

## 🔗 Links

- **GitHub Repository**: https://github.com/FoundationINCCorporateTeam/RIFT-SITE
- **Installation**: `curl -fsSL https://rift.astroyds.com/rift/install.sh | sh`
- **Uninstallation**: `curl -fsSL https://rift.astroyds.com/rift/uninstall.sh | sh`