# Setup Guide: Configuring AI and Browser Rendering Bindings

## Overview
The eBay Listing AI app now supports real Cloudflare Workers AI and Browser Rendering capabilities. To enable these features, you need to configure the bindings in your Cloudflare dashboard.

## Current Deployment
🌐 **Live Demo:** https://52a75d98.ebay-listing-ai.pages.dev

## Required Bindings

### 1. Workers AI Binding
**Purpose:** Enables real AI-powered description generation and content analysis

**Configuration Steps:**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Select your **ebay-listing-ai** project
3. Navigate to **Settings** → **Bindings**
4. Click **Add** → **Workers AI**
5. Set **Variable name** to: `AI`
6. Save and redeploy

### 2. Browser Rendering Binding  
**Purpose:** Enables screenshot capture, web scraping, and content extraction

**Configuration Steps:**
1. In the same **Bindings** section
2. Click **Add** → **Browser Rendering**
3. Set **Variable name** to: `BROWSER`  
4. Save and redeploy

## Features Enabled

### ✨ Workers AI Features
- **InvokeLLM**: Real AI-powered eBay listing descriptions
- **GenerateImage**: AI image generation using Stable Diffusion
- **ExtractFileData**: AI-powered data extraction from uploaded files

### 🌐 Browser Rendering Features
- **TakeScreenshot**: Capture screenshots of any webpage
- **ScrapeContent**: Extract specific HTML elements
- **ExtractLinks**: Get all links from a webpage  
- **ExtractPageContent**: Full page content extraction

## Testing the Features

### AI Functionality Test
1. Go to the Wizard → Product Basics step
2. Enter a basic product description
3. Click "✨ Enhance with AI" - should use real Workers AI

### Browser Rendering Test  
1. Go to Dashboard (scroll down to Browser Rendering Demo)
2. Enter any URL (e.g., https://example.com)
3. Test the browser rendering functions

## API Endpoints
The following API endpoints are now available:

- `POST /api/llm` - AI text generation
- `POST /api/generate-image` - AI image generation  
- `POST /api/screenshot` - Website screenshots
- `POST /api/scrape` - Content scraping
- `POST /api/extract-links` - Link extraction
- `POST /api/extract-content` - Full content extraction
- `POST /api/extract-file-data` - File data analysis

## Fallback Behavior
If bindings are not configured, the app automatically falls back to mock responses, ensuring it continues to work for demonstration purposes.

## Cost Considerations
- **Workers AI**: Pay-per-request pricing
- **Browser Rendering**: Usage-based pricing
- Both services have free tiers available

## Next Steps
1. Configure the bindings in your Cloudflare dashboard
2. Test the real AI and browser rendering features
3. Customize the AI prompts and browser automation workflows
4. Extend with additional Cloudflare services (R2, KV, D1) as needed