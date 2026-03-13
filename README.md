# Article Generator

A simple Node.js script that converts JSON article data into beautiful HTML pages with your brand colors (#0a1800 and #c9ff00).

## ✨ Features

- Clean, professional design with brand colors
- Responsive mobile-friendly interface
- Author & publication date display
- Metadata and tags section
- Share buttons for social media
- Dark footer with brand styling
- Git integration for syncing with GitHub

## Setup

No dependencies required! Just Node.js.

```bash
cd "article generator "
```

### Git Integration (Already Set Up ✅)

This folder is already connected to your GitHub repository:
```
https://github.com/yossi2505/articles.git
```

Check status anytime:
```bash
git status
```

## Usage Workflow

### Step 1: Create Article JSON
Create a new JSON file with your article data (e.g., `article1.json`):

```json
[
  {
    "output": {
      "title": "Your Article Title",
      "article": "Full article text here...",
      "author": "Author Name",
      "excerpt": "Brief summary",
      "keywords": "seo keywords",
      "success": true
    }
  }
]
```

### Step 2: Generate HTML
```bash
node generator.js article1.json article1.html
```

### Step 3: Sync with GitHub
```bash
git add article1.json article1.html
git commit -m "Add article: Your Article Title"
git push origin main
```

### Step 4: Enable GitHub Pages
1. Go to your GitHub repo settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Your articles will be available at: `https://yossi2505.github.io/articles/article1.html`

## Input JSON Format

Create JSON files for your articles. The generator supports this format:

```json
[
  {
    "output": {
      "title": "Your Article Title",
      "article": "Full article text here. Split paragraphs with double newlines.\n\nSecond paragraph here.",
      "author": "Author Name",
      "excerpt": "Brief summary of the article",
      "keywords": "seo keywords here",
      "tags": ["tag1", "tag2", "tag3"],
      "success": true
    }
  }
]
```

**All fields are optional except `title` and `article`.**

## Command

```bash
node generator.js input.json output.html
```

- **Argument 1**: Input JSON file (default: `input.json`)
- **Argument 2**: Output HTML file (default: `article.html`)
