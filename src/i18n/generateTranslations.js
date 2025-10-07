// Script to generate basic translation files for all languages
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Basic template with essential translations
const createBasicTranslation = (langCode, langName) => ({
  "nav": {
    "features": "Features",
    "pricing": "Pricing", 
    "about": "About",
    "dashboard": "Dashboard",
    "createDescription": "Create Description",
    "myDescriptions": "My Descriptions",
    "signIn": "Sign In",
    "getStarted": "Get Started",
    "settings": "Settings",
    "signOut": "Sign Out"
  },
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "view": "View",
    "copy": "Copy",
    "export": "Export",
    "upgrade": "Upgrade",
    "search": "Search",
    "all": "All",
    "success": "Success",
    "error": "Error"
  },
  "plans": {
    "free": {
      "name": "Free",
      "price": "$0/mo",
      "description": "3 listing descriptions total",
      "features": [
        "3 AI-generated descriptions total",
        "Basic AI descriptions", 
        "Standard templates",
        "Email support"
      ]
    },
    "pro": {
      "name": "Pro",
      "price": "$29/mo", 
      "description": "100 listings per month"
    },
    "enterprise": {
      "name": "Enterprise",
      "price": "$99/mo",
      "description": "Unlimited listings"
    }
  },
  "home": {
    "hero": {
      "title": "Transform Your eBay Listings with AI-Powered Descriptions",
      "subtitle": "Generate compelling, SEO-optimized product descriptions that boost sales and save you hours of writing time.",
      "cta": "Start Creating Free"
    },
    "features": {
      "title": "Why Choose eBay DescriptionAI?",
      "languages": {
        "title": "50+ Languages",
        "description": "Reach global customers with descriptions in their native language"
      }
    }
  },
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Welcome back"
  },
  "account": {
    "title": "Account Settings",
    "changePlan": "Change Plan",
    "upgradeNow": "Upgrade Now"
  }
});

// Language codes and their information
const languages = [
  'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'th', 'vi', 'tr', 
  'pl', 'nl', 'sv', 'da', 'no', 'fi', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk', 'sl',
  'et', 'lv', 'lt', 'el', 'he', 'fa', 'ur', 'bn', 'ta', 'te', 'ml', 'kn', 'gu', 
  'pa', 'mr', 'ne', 'si', 'my', 'km', 'lo', 'ka', 'am', 'sw', 'zu', 'af'
];

// Generate files
languages.forEach(langCode => {
  const translation = createBasicTranslation(langCode);
  const content = JSON.stringify(translation, null, 2);
  fs.writeFileSync(path.join(__dirname, 'locales', `${langCode}.json`), content);
  console.log(`Created ${langCode}.json`);
});

console.log('All translation files created!');