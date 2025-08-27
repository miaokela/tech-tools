const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查是否安装了必要的工具
function checkDependencies() {
  try {
    execSync('which convert', { stdio: 'ignore' });
    console.log('✓ ImageMagick found');
    return true;
  } catch (error) {
    console.log('✗ ImageMagick not found. Please install it with: brew install imagemagick');
    return false;
  }
}

// 生成PNG图标
function generatePNG() {
  try {
    // 使用ImageMagick转换SVG到PNG
    execSync('convert assets/icon.svg -resize 512x512 assets/icons/icon-512.png');
    execSync('convert assets/icon.svg -resize 256x256 assets/icons/icon-256.png');
    execSync('convert assets/icon.svg -resize 128x128 assets/icons/icon-128.png');
    execSync('convert assets/icon.svg -resize 64x64 assets/icons/icon-64.png');
    execSync('convert assets/icon.svg -resize 32x32 assets/icons/icon-32.png');
    execSync('convert assets/icon.svg -resize 16x16 assets/icons/icon-16.png');
    
    console.log('✓ PNG icons generated successfully');
    return true;
  } catch (error) {
    console.log('✗ Failed to generate PNG icons:', error.message);
    return false;
  }
}

// 主函数
function main() {
  console.log('Generating CodeBuddy icons...');
  
  if (!checkDependencies()) {
    return;
  }
  
  // 创建icons目录
  if (!fs.existsSync('assets/icons')) {
    fs.mkdirSync('assets/icons', { recursive: true });
  }
  
  if (generatePNG()) {
    console.log('\n🎉 Icons generated successfully!');
    console.log('📁 Location: assets/icons/');
    console.log('📄 Formats: PNG (16x16, 32x32, 64x64, 128x128, 256x256, 512x512)');
  }
}

main();