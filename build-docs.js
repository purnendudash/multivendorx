const fs = require('fs');
const { marked } = require('marked');

const markdown = fs.readFileSync('index.md', 'utf8');
const htmlContent = marked.parse(markdown);

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${process.env.PLUGIN_NAME} REST API Documentation</title>

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px;
      line-height: 1.7;
      color: #333;
    }

    h1,h2,h3,h4 {
      margin-top: 2rem;
    }

    pre {
      background: #f6f8fa;
      padding: 15px;
      overflow-x: auto;
      border-radius: 6px;
    }

    code {
      background: #f6f8fa;
      padding: 2px 4px;
      border-radius: 3px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    table th,
    table td {
      border: 1px solid #ddd;
      padding: 8px;
    }

    table th {
      background: #f4f4f4;
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
`;

fs.writeFileSync('index.html', html);
