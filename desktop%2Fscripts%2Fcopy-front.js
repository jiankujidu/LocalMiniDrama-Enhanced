/**
 * 复制前端构建产物到桌面端
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../frontweb/dist');
const destDir = path.join(__dirname, 'resources/app/frontweb/dist');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying frontend build to desktop...');
copyDir(srcDir, destDir);
console.log('Done!');
