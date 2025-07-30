const { execSync } = require('child_process');

try {
  // Install dependencies
  execSync('npm install', { stdio: 'inherit' });

  // Generate Prisma Client
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Build TypeScript
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 