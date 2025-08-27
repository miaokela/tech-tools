#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 正在检查并等待Electron安装...');

// 检查是否已安装Electron
function isElectronInstalled() {
  try {
    const electronPath = require.resolve('electron');
    return fs.existsSync(electronPath);
  } catch (error) {
    return false;
  }
}

// 尝试安装Electron
function installElectron() {
  console.log('📦 开始安装Electron...');
  
  // 设置Electron镜像源
  process.env.ELECTRON_MIRROR = 'https://cdn.npmmirror.com/binaries/electron/';
  process.env.ELECTRON_CUSTOM_DIR = process.platform === 'darwin' ? '25.9.3' : '25.9.3';
  
  try {
    // 使用npm安装Electron
    execSync('npm install electron@25.9.3 --no-optional --verbose', {
      stdio: 'inherit',
      timeout: 300000 // 5分钟超时
    });
    console.log('✅ Electron安装成功！');
    return true;
  } catch (error) {
    console.error('❌ Electron安装失败:', error.message);
    return false;
  }
}

// 主函数
async function main() {
  if (isElectronInstalled()) {
    console.log('✅ Electron已经安装');
    return true;
  }

  console.log('❌ Electron未安装，开始安装过程...');
  
  // 尝试安装
  const success = installElectron();
  
  if (!success) {
    console.log('\n⚠️  Electron安装遇到网络问题，请尝试以下解决方案：');
    console.log('1. 手动下载Electron: https://cdn.npmmirror.com/binaries/electron/25.9.3/');
    console.log('2. 设置环境变量: export ELECTRON_MIRROR=https://cdn.npmmirror.com/binaries/electron/');
    console.log('3. 或者使用: npm config set electron_mirror https://cdn.npmmirror.com/binaries/electron/');
    console.log('4. 重新运行: npm install electron@25.9.3');
  }
  
  return success;
}

// 执行主函数
main().then(success => {
  process.exit(success ? 0 : 1);
});