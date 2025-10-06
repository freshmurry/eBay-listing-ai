export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Handle API routes
  if (url.pathname.startsWith('/api/')) {
    // Add CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const body = request.method === 'POST' ? await request.json() : {};
      
      switch (url.pathname) {
        case '/api/llm':
          return await handleLLM(body, env, corsHeaders);
          
        case '/api/generate-image':
          return await handleGenerateImage(body, env, corsHeaders);
          
        case '/api/screenshot':
          return await handleScreenshot(body, env, corsHeaders);
          
        case '/api/scrape':
          return await handleScrape(body, env, corsHeaders);
          
        case '/api/extract-links':
          return await handleExtractLinks(body, env, corsHeaders);
          
        case '/api/extract-content':
          return await handleExtractContent(body, env, corsHeaders);
          
        case '/api/extract-file-data':
          return await handleExtractFileData(body, env, corsHeaders);
          
        default:
          return new Response(JSON.stringify({ error: 'API endpoint not found' }), { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
      }
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
  
  // For all other requests, serve the static assets
  return env.ASSETS.fetch(request);
}

async function handleLLM(params, env, corsHeaders) {
  try {
    const { prompt, model = '@cf/meta/llama-3.1-8b-instruct', maxTokens = 500 } = params;
    
    if (!env.AI) {
      return new Response(JSON.stringify({
        success: false,
        error: 'AI binding not available'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const response = await env.AI.run(model, {
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

    return new Response(JSON.stringify({
      success: true,
      result: response.response || response.text || 'AI response generated successfully'
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Workers AI Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleGenerateImage(params, env, corsHeaders) {
  try {
    const { prompt, steps = 20 } = params;
    
    if (!env.AI) {
      return new Response(JSON.stringify({
        success: false,
        error: 'AI binding not available'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const response = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
      prompt,
      num_steps: steps
    });

    return new Response(JSON.stringify({
      success: true,
      image: response,
      id: 'ai-image-' + Date.now()
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleScreenshot(params, env, corsHeaders) {
  try {
    const { url, options = {} } = params;
    
    if (!env.BROWSER) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Browser binding not available'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const screenshot = await env.BROWSER.screenshot({
      url,
      options: {
        format: 'png',
        fullPage: false,
        ...options
      }
    });

    return new Response(screenshot, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png'
      }
    });
  } catch (error) {
    console.error('Screenshot error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleScrape(params, env, corsHeaders) {
  try {
    const { url, selector } = params;
    
    if (!env.BROWSER) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Browser binding not available'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const content = await env.BROWSER.scrape({
      url,
      selector
    });

    return new Response(JSON.stringify({
      success: true,
      content,
      extractedAt: new Date().toISOString()
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleExtractLinks(params, env, corsHeaders) {
  try {
    const { url } = params;
    
    if (!env.BROWSER) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Browser binding not available'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const links = await env.BROWSER.links({ url });

    return new Response(JSON.stringify({
      success: true,
      links,
      extractedAt: new Date().toISOString()
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Link extraction error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleExtractContent(params, env, corsHeaders) {
  try {
    const { url } = params;
    
    if (!env.BROWSER) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Browser binding not available'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const content = await env.BROWSER.content({ url });

    return new Response(JSON.stringify({
      success: true,
      content,
      extractedAt: new Date().toISOString()
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Content extraction error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleExtractFileData(params, env, corsHeaders) {
  try {
    const { fileContent, fileType, prompt } = params;
    
    if (!env.AI) {
      return new Response(JSON.stringify({
        success: false,
        error: 'AI binding not available'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const analysisPrompt = prompt || `Analyze this ${fileType} file and extract product information including name, description, price, and category. Return as JSON.`;
    
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
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

    return new Response(JSON.stringify({
      success: true,
      data: extractedData
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('File extraction error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}