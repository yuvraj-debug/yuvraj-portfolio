import fs from 'fs';
import { execSync } from 'child_process';

console.log('Running check...');
try {
  execSync('node scripts/build.mjs', { stdio: 'inherit' });
  if (!fs.existsSync('Asset/dist/app.js')) throw new Error('Missing Asset/dist/app.js');
  if (!fs.existsSync('Asset/dist/app.css')) throw new Error('Missing Asset/dist/app.css');
  console.log('Check passed: build produced Asset/dist/app.js and Asset/dist/app.css');
} catch (err) {
  console.error('Check failed:', err.message);
  process.exit(1);
}
