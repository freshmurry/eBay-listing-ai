// Cloudflare Workers API client with real AI and Browser Rendering
// This runs in the Cloudflare Worker environment, not in the browser

export class CloudflareWorkersAPI {
  constructor(env) {
    this.env = env;
    this.AI = env.AI;
    this.BROWSER = env.BROWSER;
  }

  async invokeLLM(params) {
    try {
      const { prompt, model = '@cf/meta/llama-3.1-8b-instruct', maxTokens = 500 } = params;
      
      const response = await this.AI.run(model, {
        messages: [
          {
            role: 'system',
            content: 'You are an expert eBay listing writer. Create compelling, SEO-optimized product descriptions that highlight key features and benefits.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens
      });

      return {
        success: true,
        result: response.response || response.text || 'AI response generated successfully'
      };
    } catch (error) {
      console.error('Workers AI Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async generateImage(params) {
    try {
      const { prompt, steps = 20 } = params;
      
      const response = await this.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
        prompt,
        num_steps: steps
      });

      return {
        success: true,
        image: response,
        id: 'ai-image-' + Date.now()
      };
    } catch (error) {
      console.error('Image generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async takeScreenshot(params) {
    try {
      const { url, options = {} } = params;
      
      const screenshot = await this.BROWSER.screenshot({
        url,
        options: {
          format: 'png',
          fullPage: false,
          ...options
        }
      });

      return {
        success: true,
        screenshot,
        id: 'screenshot-' + Date.now()
      };
    } catch (error) {
      console.error('Screenshot error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async scrapeContent(params) {
    try {
      const { url, selector } = params;
      
      const content = await this.BROWSER.scrape({
        url,
        selector
      });

      return {
        success: true,
        content,
        extractedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Scraping error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async extractLinks(params) {
    try {
      const { url } = params;
      
      const links = await this.BROWSER.links({
        url
      });

      return {
        success: true,
        links,
        extractedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Link extraction error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async extractPageContent(params) {
    try {
      const { url } = params;
      
      const content = await this.BROWSER.content({
        url
      });

      return {
        success: true,
        content,
        extractedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Content extraction error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async extractDataFromUploadedFile(params) {
    try {
      const { fileContent, fileType, prompt } = params;
      
      // Use Workers AI to analyze the file content
      const analysisPrompt = prompt || `Analyze this ${fileType} file and extract product information including name, description, price, and category. Return as JSON.`;
      
      const response = await this.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are a data extraction expert. Extract structured product information from uploaded files.'
          },
          {
            role: 'user',
            content: `${analysisPrompt}\n\nFile content: ${fileContent}`
          }
        ]
      });

      // Try to parse as JSON, fallback to structured text
      let extractedData;
      try {
        extractedData = JSON.parse(response.response);
      } catch {
        extractedData = {
          productName: "Extracted Product",
          description: response.response || "Product information extracted from file",
          price: "TBD",
          category: "General"
        };
      }

      return {
        success: true,
        data: extractedData
      };
    } catch (error) {
      console.error('File extraction error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}