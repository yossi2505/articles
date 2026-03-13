# Article Generator

A simple Node.js script that converts JSON article data into beautiful HTML pages.

## Features

✨ Professional article layout
- Clean, modern design
- Responsive mobile-friendly interface
- Featured image support
- Author & publication date display
- Metadata and tags
- Share buttons
- Dark footer

## Installation

No dependencies required! Just Node.js.

```bash
cd "article generator "
```

## Usage

### Basic Usage

```bash
node generator.js input.json article.html
```

This will generate an `article.html` file from your `input.json`.

### Default Usage

```bash
node generator.js
```

Automatically uses `input.json` as input and generates `article.html`.

## Input JSON Format

Your `input.json` can be in two formats:

### Format 1: Direct article object
```json
{
  "title": "Article Title",
  "author": "Author Name",
  "publishDate": "2024-03-13",
  "featuredImage": "https://example.com/image.jpg",
  "excerpt": "Brief article excerpt",
  "content": [
    { "type": "paragraph", "text": "Paragraph text" },
    { "type": "heading", "level": 2, "text": "Section Heading" }
  ],
  "tags": ["tag1", "tag2"],
  "keywords": "SEO keywords"
}
```

### Format 2: Wrapped output format
```json
[
  {
    "output": {
      "title": "Article Title",
      "article": "Full article text here",
      "source": "https://example.com",
      "success": true
    }
  }
]
```

## Options

- **Input File**: First argument (default: `input.json`)
- **Output File**: Second argument (default: `article.html`)

```bash
node generator.js custom-input.json output-page.html
```

## Customization

Edit the CSS in `generator.js` to customize:
- Colors and fonts
- Layout spacing
- Responsive breakpoints
- Button styles
- Footer content

## Example

Generate with your input:

```bash
node generator.js input.json article.html
open article.html  # macOS
# or
start article.html  # Windows
xdg-open article.html  # Linux
```

Enjoy! 🎉
