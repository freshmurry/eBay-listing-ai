# eBay Listing AI - Enhanced with Cloudflare Workers

🚀 **Live Demo:** https://52a75d98.ebay-listing-ai.pages.dev

A powerful AI-driven eBay listing generator built with React and deployed on Cloudflare Pages with Workers AI and Browser Rendering capabilities.

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Smart Descriptions**: Generate compelling eBay listings using Cloudflare Workers AI
- **Image Generation**: Create product images with Stable Diffusion XL
- **File Analysis**: Extract product data from uploaded files using AI

### 🌐 Browser Automation
- **Screenshot Capture**: Take screenshots of any webpage
- **Web Scraping**: Extract specific content from websites
- **Link Extraction**: Get all links from web pages
- **Content Analysis**: Full page content extraction

### 📝 Listing Management
- **Step-by-Step Wizard**: Guided listing creation process
- **Local Storage**: Persistent data storage in browser
- **Demo Data**: Pre-populated examples for testing

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS
- **Backend**: Cloudflare Pages Functions
- **AI**: Cloudflare Workers AI (Llama 3.1, Stable Diffusion)
- **Browser**: Cloudflare Browser Rendering
- **Deployment**: Cloudflare Pages

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Building
```bash
npm run build
```

### Deployment
```bash
npx wrangler pages deploy dist --project-name ebay-listing-ai
```

## ⚙️ Configuration

To enable AI and Browser Rendering features, configure bindings in your Cloudflare dashboard:

1. **Workers AI Binding**: Variable name `AI`
2. **Browser Rendering Binding**: Variable name `BROWSER`

See [SETUP_BINDINGS.md](./SETUP_BINDINGS.md) for detailed instructions.

## 📁 Project Structure

```
src/
├── api/
│   ├── base44Client.js      # Hybrid API client (mock + real)
│   ├── workersAPI.js        # Cloudflare Workers API
│   └── integrations.js      # API integrations
├── components/
│   ├── BrowserRenderingDemo.jsx  # Demo component
│   ├── wizard/              # Listing creation steps
│   └── ui/                  # Reusable UI components
├── pages/
│   ├── Dashboard.jsx        # Main dashboard
│   └── Wizard.jsx           # Listing wizard
functions/
└── [[path]].js              # Cloudflare Pages Functions
```

## 🎯 API Endpoints

- `POST /api/llm` - AI text generation
- `POST /api/generate-image` - AI image generation
- `POST /api/screenshot` - Website screenshots  
- `POST /api/scrape` - Content scraping
- `POST /api/extract-links` - Link extraction
- `POST /api/extract-content` - Full content extraction

## 🔄 Migration History

This project was migrated from Base44 to a standalone Cloudflare application:
- ✅ Removed Base44 SDK dependencies
- ✅ Created mock API implementations
- ✅ Added Cloudflare Workers AI integration
- ✅ Added Browser Rendering capabilities
- ✅ Deployed on Cloudflare Pages

## 📄 License

MIT License - Feel free to use and modify for your projects.