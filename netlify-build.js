const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isRoot = fs.existsSync(path.join(__dirname, 'acrux-web', 'package.json'));
const webDir = isRoot ? path.join(__dirname, 'acrux-web') : __dirname;

console.log('=== Netlify Build Started ===');
console.log('Working in directory:', webDir);

// 1. Install dependencies
console.log('Installing dependencies...');
execSync('npm install --include=dev', { cwd: webDir, stdio: 'inherit' });

// 2. Build Next.js static export
console.log('Running Next.js build...');
execSync('npm run build', { cwd: webDir, stdio: 'inherit' });

// 3. Ensure build artifacts are copied to root /build directory for Netlify publish
const buildDir = path.join(webDir, 'build');
const rootBuildDir = path.join(__dirname, 'build');

if (isRoot && fs.existsSync(buildDir)) {
  console.log('Copying build output to root build directory...');
  if (!fs.existsSync(rootBuildDir)) {
    fs.mkdirSync(rootBuildDir, { recursive: true });
  }
  fs.cpSync(buildDir, rootBuildDir, { recursive: true });

  // Ensure /admin/index.html exists alongside /admin.html for maximum compatibility
  const adminHtml = path.join(rootBuildDir, 'admin.html');
  const adminSubDir = path.join(rootBuildDir, 'admin');
  const adminIndex = path.join(adminSubDir, 'index.html');
  if (fs.existsSync(adminHtml)) {
    if (!fs.existsSync(adminSubDir)) {
      fs.mkdirSync(adminSubDir, { recursive: true });
    }
    fs.copyFileSync(adminHtml, adminIndex);
    console.log('Generated admin/index.html fallback.');
  }
}

console.log('=== Netlify Build Completed Successfully ===');
