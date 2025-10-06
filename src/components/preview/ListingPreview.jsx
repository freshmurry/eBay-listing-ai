import React from "react";

export default function ListingPreview({ project }) {
  if (!project) return null;

  const htmlContent = project.htmlPreview || generatePreviewHtml(project);

  return (
    <iframe 
      srcDoc={htmlContent}
      title="listing-preview"
      className="w-full h-full border-0"
      sandbox="allow-scripts"
    />
  );
}

function generatePreviewHtml(projectData) {
  const shippingText = {
    "SAME_DAY": "Same Business Day",
    "D2_5": "2-5 Business Days", 
    "D15_20": "15-20 Business Days"
  }[projectData.shippingPolicy] || "2-5 Business Days";

  const sanitizedDescription = (projectData.description || '').replace(/`/g, '\\`');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${projectData.title}</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #484848; background-color: #FFF; margin: 0; padding: 0; }
            .b_container { max-width: 900px; margin: auto; padding: 24px; }
            .b_header { margin-bottom: 2rem; }
            .b_title { font-size: 2rem; font-weight: 600; color: #222222; }
            .b_image_grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
            .b_image_item { aspect-ratio: 1 / 1; border-radius: 12px; overflow: hidden; }
            .b_image { width: 100%; height: 100%; object-fit: cover; }
            .b_section { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #EBEBEB; }
            .b_section_title { font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; color: #222222; }
            .b_description p { margin-bottom: 1rem; line-height: 1.6; }
            .b_highlight_item { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; }
            .b_highlight_icon { color: #00A699; font-size: 1.25rem; margin-top: 2px; }
        </style>
    </head>
    <body>
      <div class="b_container">
        <header class="b_header">
          <h1 class="b_title">${projectData.title}</h1>
        </header>
                <section class="b_image_grid">
          ${(projectData.images || []).map(img => {
            const imageUrl = typeof img === 'string' ? img : img.url;
            if (!imageUrl) return ''; // Skip invalid images
            return `<div class="b_image_item"><img src="${imageUrl}" alt="Product image" class="b_image" onerror="this.style.display='none'" /></div>`;
          }).filter(Boolean).join('')}
        </section>
        <main>
            <section class="b_section">
                <h2 class="b_section_title">About this item</h2>
                <div class="b_description">${sanitizedDescription}</div>
            </section>
            ${(projectData.highlights || []).length > 0 ? `
            <section class="b_section">
                <h2 class="b_section_title">What this item offers</h2>
                <div>
                    ${(projectData.highlights || []).map(highlight => `
                    <div class="b_highlight_item">
                        <div class="b_highlight_icon">✓</div>
                        <p>${highlight.replace(/\*([^*]+)\*/g, '<strong>$1</strong>')}</p>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
            <section class="b_section">
                <h2 class="b_section_title">Things to Know</h2>
                <div class="b_description">
                    <p><strong>Shipping Policy:</strong> ${shippingText}</p>
                    <p><strong>Return Policy:</strong> 30-day returns.</p>
                </div>
            </section>
        </main>
      </div>
    </body>
    </html>
  `;
}