# Base44 App


This app was created automatically by Base44.
It's a Vite+React app that communicates with the Base44 API.

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

## Deploying to Cloudflare

This project is configured for deployment to Cloudflare Pages/Workers with static assets.

### Option 1: Using the command line
```bash
npx wrangler deploy --assets=./dist
```

### Option 2: Using the npm script (recommended)
```bash
npm run deploy
```

### Option 3: Using the wrangler.jsonc configuration file
The project includes a `wrangler.jsonc` file that configures:
- Worker name: `ebay-listing-ai`
- Compatibility date: `2025-09-26`
- Assets directory: `./dist`

Simply run:
```bash
npx wrangler deploy
```

### Prerequisites
Make sure you have wrangler installed and configured:
```bash
npm install -g wrangler
wrangler auth login
```

For more information and support, please contact Base44 support at app@base44.com.