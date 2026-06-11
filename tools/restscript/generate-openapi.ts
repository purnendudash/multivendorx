import * as fs from 'fs';
import * as path from 'path';

async function generateSpec() {
  const selectedPlugin = process.argv[2] || 'multivendorx';
  console.log(`[Parser Engine] Dynamically mapping PHP routes for: ${selectedPlugin}`);

  const outputPath = path.join(process.cwd(), 'openapi.json');
  const restApiDirectory = path.join(process.cwd(), `plugins/${selectedPlugin}/classes/RestAPI`);

  // Fallback metadata shell if no classes folder exists
  const openApiSpec: any = {
    openapi: '3.0.0',
    info: {
      title: `${selectedPlugin.toUpperCase()} REST API Documentation`,
      description: `Dynamically parsed developer reference for the ${selectedPlugin} platform module.`,
      version: '1.0.0'
    },
    host: 'purnendu-multivendorx.github.io',
    basePath: `/wp-json/${selectedPlugin}/v1`,
    schemes: ['https'],
    paths: {}
  };

  if (!fs.existsSync(restApiDirectory)) {
    console.error(`Directory not found: ${restApiDirectory}. Writing bare-minimum specification shell.`);
    fs.writeFileSync(outputPath, JSON.stringify(openApiSpec, null, 2));
    return;
  }

  // Recursively read all PHP files in the RestAPI directory
  const readFilesRecursively = (dir: string): string[] => {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(readFilesRecursively(filePath));
      } else if (file.endsWith('.php')) {
        results.push(filePath);
      }
    });
    return results;
  };

  const phpFiles = readFilesRecursively(restApiDirectory);
  console.log(`[Parser Engine] Found ${phpFiles.length} PHP controller files to process.`);

  phpFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Target typical WordPress REST routing patterns: register_rest_route( namespace, route, args )
    // Captures structural endpoint paths (e.g., '/products', '/orders/(?P<id>[\d]+)')
    const routeRegex = /register_rest_route\s*\(\s*[^,]+,\s*['"]([^'"]+)['"]/g;
    let match;

    while ((match = routeRegex.exec(content)) !== null) {
      let routePath = match[1];

      // Convert WordPress regex parameters '(?P<id>[\d]+)' safely to clean OpenAPI brackets '{id}'
      routePath = routePath.replace(/\(\?P<([^>]+)>[^\)]+\)/g, '{$1}');
      if (!routePath.startsWith('/')) {
        routePath = '/' + routePath;
      }

      if (!openApiSpec.paths[routePath]) {
        openApiSpec.paths[routePath] = {};
      }

      // 2. Scan immediate downstream blocks to extract the assigned standard HTTP request methods
      const contextSnippet = content.substring(match.index, match.index + 1500);
      const methods: string[] = [];
      
      if (/methods\s*=>\s*[^,]*GET/i.test(contextSnippet) || /WP_REST_Server::READABLE/i.test(contextSnippet)) methods.push('get');
      if (/methods\s*=>\s*[^,]*POST/i.test(contextSnippet) || /WP_REST_Server::CREATABLE/i.test(contextSnippet)) methods.push('post');
      if (/methods\s*=>\s*[^,]*PUT/i.test(contextSnippet) || /methods\s*=>\s*[^,]*PATCH/i.test(contextSnippet) || /WP_REST_Server::EDITABLE/i.test(contextSnippet)) methods.push('put');
      if (/methods\s*=>\s*[^,]*DELETE/i.test(contextSnippet) || /WP_REST_Server::DELETABLE/i.test(contextSnippet)) methods.push('delete');

      // Default to get if mapping context structure is highly obscured
      if (methods.length === 0) methods.push('get');

      methods.forEach((method) => {
        // Build operational profile template parameters for Widdershins 3-column processing layout
        openApiSpec.paths[routePath][method] = {
          summary: `Endpoint route auto-extracted from ${path.basename(filePath)}`,
          description: `Dynamically generated documentation profile mapping for path endpoint \`${routePath}\`.`,
          responses: {
            '200': {
              description: 'Successful REST API processing transaction payload response.'
            }
          }
        };
      });
    }
  });

  // Guarantee that an openapi.json file is ALWAYS written to disk
  fs.writeFileSync(outputPath, JSON.stringify(openApiSpec, null, 2));
  console.log(`[Parser Engine] Successfully generated openapi.json file at: ${outputPath}`);
}

generateSpec().catch((err) => {
  console.error('Error generating OpenAPI spec:', err);
  process.exit(1);
});
