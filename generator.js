#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateArticleHTML(inputFile) {
  // Read the input JSON file
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  // Handle both single object and array formats
  let article = data;
  if (Array.isArray(data) && data[0] && data[0].output) {
    article = data[0].output;
  }

  // Format the date if it exists
  let formattedDate = '';
  if (article.publishDate) {
    const publishDate = new Date(article.publishDate);
    formattedDate = publishDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Generate content HTML - handle article text field
  let contentHTML = '';
  if (article.article) {
    // Split by double newlines to create paragraphs
    const paragraphs = article.article.split('\n\n').filter(p => p.trim());
    paragraphs.forEach(para => {
      contentHTML += `<p class="article-paragraph">${para.trim()}</p>\n`;
    });
  } else if (article.content) {
    if (Array.isArray(article.content)) {
      article.content.forEach(block => {
        if (block.type === 'paragraph') {
          contentHTML += `<p class="article-paragraph">${block.text}</p>\n`;
        } else if (block.type === 'heading') {
          const level = block.level || 2;
          contentHTML += `<h${level} class="article-heading">${block.text}</h${level}>\n`;
        }
      });
    } else if (typeof article.content === 'string') {
      contentHTML = `<p class="article-paragraph">${article.content}</p>`;
    }
  }

  // Generate tags HTML
  let tagsHTML = '';
  if (article.tags && Array.isArray(article.tags)) {
    tagsHTML = article.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('\n');
  }

  // Generate the complete HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${article.keywords || article.title || ''}">
  <title>${article.title || 'Article'}</title>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.7;
      color: #1a1a1a;
      background: #ffffff;
    }

    /* Header/Navigation */
    header {
      display: none;
    }

    /* Main content container */
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Hero/Title Section */
    .article-hero {
      padding: 4rem 0;
      background: linear-gradient(to bottom, #f8f9fa, #ffffff);
      border-bottom: 3px solid #0a1800;
    }

    .article-hero h1 {
      font-size: 3rem;
      line-height: 1.15;
      margin-bottom: 1.5rem;
      color: #0a1800;
      font-weight: 800;
      letter-spacing: -1px;
    }

    .article-meta {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      font-size: 0.95rem;
      color: #666;
      flex-wrap: wrap;
    }

    .article-meta span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .article-meta a {
      color: #0a1800;
      text-decoration: none;
      transition: color 0.3s;
    }

    .article-meta a:hover {
      color: #c9ff00;
      text-decoration: underline;
    }

    .article-excerpt {
      font-size: 1.3rem;
      line-height: 1.7;
      color: #444;
      margin-top: 1.5rem;
      font-weight: 500;
    }

    /* Article Body */
    .article-body {
      padding: 3rem 0;
    }

    .article-paragraph {
      margin-bottom: 1.8rem;
      font-size: 1.05rem;
      line-height: 1.8;
      color: #333;
      text-align: left;
    }

    .article-heading {
      font-size: 1.8rem;
      margin: 3rem 0 1.5rem;
      color: #1a1a1a;
      line-height: 1.3;
      font-weight: 700;
    }

    h2 {
      border-left: 4px solid #c9ff00;
      padding-left: 1.2rem;
    }

    /* Tags Section */
    .tags-section {
      margin: 3rem 0 0;
      padding: 2rem 0;
      border-top: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }

    .tags-label {
      font-weight: 700;
      margin-bottom: 1rem;
      color: #0a1800;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .tag {
      display: inline-block;
      background: #f3f4f6;
      color: #0a1800;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: all 0.3s;
      cursor: pointer;
      border: 2px solid #c9ff00;
    }

    .tag:hover {
      background: #c9ff00;
      color: #0a1800;
      border-color: #0a1800;
      transform: translateY(-2px);
    }

    /* Share Section */
    .share-section {
      display: flex;
      gap: 1rem;
      margin: 3rem 0;
      padding: 2rem 0;
      flex-wrap: wrap;
    }

    .share-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1.5rem;
      background: #f3f4f6;
      border: 2px solid #0a1800;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      color: #0a1800;
      font-size: 0.95rem;
      font-weight: 600;
    }

    .share-button:hover {
      background: #0a1800;
      color: #c9ff00;
      border-color: #c9ff00;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(10, 24, 0, 0.3);
    }

    /* Footer */
    footer {
      background: #0a1800;
      color: #c9ff00;
      margin-top: 5rem;
      padding: 3rem 2rem;
      text-align: center;
      border-top: 3px solid #c9ff00;
    }

    footer .container {
      max-width: 800px;
      margin: 0 auto;
    }

    footer p {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    footer a {
      color: #c9ff00;
      text-decoration: none;
      transition: color 0.3s;
    }

    footer a:hover {
      color: #ffffff;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .article-hero h1 {
        font-size: 2rem;
      }

      .article-excerpt {
        font-size: 1.15rem;
      }

      .article-paragraph {
        font-size: 1rem;
      }

      .article-meta {
        gap: 1rem;
        font-size: 0.9rem;
      }

      header .container {
        flex-direction: column;
        gap: 1rem;
      }

      header nav a {
        margin-left: 1rem;
      }

      .share-section {
        flex-direction: column;
      }

      .share-button {
        width: 100%;
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="logo">Security Insights</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#articles">Articles</a>
        <a href="#about">About</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="article-hero">
      <div class="container">
        <h1>${article.title || 'Article'}</h1>
        <div class="article-meta">
          ${formattedDate ? `<span>📅 ${formattedDate}</span>` : ''}
          ${article.author ? `<span>✍️ By ${article.author}</span>` : ''}
        </div>
        ${article.excerpt ? `<p class="article-excerpt">${article.excerpt}</p>` : ''}
      </div>
    </section>

    <article class="article-body">
      <div class="container">
        ${contentHTML}

        <div class="share-section">
          <a href="#" class="share-button">📤 Share on Twitter</a>
          <a href="#" class="share-button">💼 Share on LinkedIn</a>
          <a href="#" class="share-button">🔗 Copy Link</a>
        </div>

        ${tagsHTML ? `<div class="tags-section">
          <div class="tags-label">Tags</div>
          <div class="tags-container">
            ${tagsHTML}
          </div>
        </div>` : ''}
      </div>
    </article>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2024 Security Insights. All rights reserved.</p>
      <p><a href="#">Privacy Policy</a> | <a href="#">Contact</a></p>
    </div>
  </footer>
</body>
</html>`;

  return html;
}

// Main execution
const inputFile = process.argv[2] || 'input.json';
const outputFile = process.argv[3] || 'article.html';

try {
  const html = generateArticleHTML(inputFile);
  fs.writeFileSync(outputFile, html);
  console.log(`✅ Article generated successfully: ${outputFile}`);
} catch (error) {
  console.error('❌ Error generating article:', error.message);
  process.exit(1);
}
