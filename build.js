const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure dist directory exists and is empty
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
}
fs.mkdirSync(distPath, { recursive: true });

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Generate Prisma Client
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Build TypeScript
  console.log('Building TypeScript...');
  execSync('npx tsc -p tsconfig.json', { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 