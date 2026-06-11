import * as fs from 'fs';
import * as path from 'path';
// Fixes ES Module ReferenceError by using proper default import
import swaggerAutogenInit from 'swagger-autogen';

// Initialize the autogen tool for OpenAPI 3.0.0
const swaggerAutogen = swaggerAutogenInit({ openapi: '3.0.0' });

async function generateSpec() {
  // Capture the plugin name argument passed from the GitHub Workflow step
  // process.argv[0] = node, process.argv[1] = script, process.argv[2] = plugin-name
  const selectedPlugin = process.argv[2] || 'multivendorx';
  console.log(`[Parser Engine] Beginning schema generation context for: ${selectedPlugin}`);

  // Base OpenAPI metadata configuration matching your organization
  const doc = {
    info: {
      title: `${selectedPlugin.toUpperCase()} REST API Documentation`,
      description: `Dynamically compiled developer reference for the ${selectedPlugin} platform module.`,
      version: '1.0.0'
    },
    host: 'purnendu-multivendorx.github.io',
    basePath: `/wp-json/${selectedPlugin}/v1`, // Standard WordPress REST API URL namespace structure
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your Bearer token in the format: Bearer <token>'
      }
    }
  };

  const outputPath = path.join(process.cwd(), 'openapi.json');
  
  // Point to the specific plugin workspace directory chosen in the GitHub Actions dropdown
  const pluginDirectory = path.join(process.cwd(), `plugins/${selectedPlugin}`);
  
  if (!fs.existsSync(pluginDirectory)) {
    throw new Error(`Target workspace directory not found at: ${pluginDirectory}`);
  }

  // Define target endpoint source routers to scan.
  // Since swagger-autogen scans JS/TS source code blocks, we pass your main source directory
  const endpointsFiles = [
    path.join(pluginDirectory, 'src/app.js'),
    path.join(pluginDirectory, 'src/index.js'),
    path.join(pluginDirectory, 'src/server.ts')
  ].filter(file => fs.existsSync(file));

  // If no Node source files are found, scan the workspace directory recursively
  if (endpointsFiles.length === 0) {
    console.log(`No explicit entry points found. Falling back to project scan for: ${selectedPlugin}`);
    endpointsFiles.push(pluginDirectory);
  }

  console.log(`Scanning targets: ${JSON.stringify(endpointsFiles)}`);
  
  // Build and write openapi.json file directly to the root of the project workspace
  await swaggerAutogen(outputPath, endpointsFiles, doc);
  console.log('Successfully completed codebase schema scanning and outputted openapi.json.');
}

generateSpec().catch((err) => {
  console.error('Error generating OpenAPI spec:', err);
  process.exit(1);
});
