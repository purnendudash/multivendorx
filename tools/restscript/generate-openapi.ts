import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../../src/app.module'; // Adjust relative path to your main app module
import * as fs from 'fs';
import * as path from 'path';

async function generateSpec() {
  // Create application instance without listening to a network port
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('NestJS Application API')
    .setDescription('Dynamically generated 3-column document spec')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  const outputPath = path.join(process.cwd(), 'openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  
  console.log('Successfully generated openapi.json locally.');
  await app.close();
}

generateSpec().catch((err) => {
  console.error('Error generating OpenAPI spec:', err);
  process.exit(1);
});
