#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const TIMEOUT = 30000; // 30秒超时
const INTERVAL = 1000; // 每1秒检查一次

// 动态检测Vite端口
function detectVitePort() {
  try {
    // 检查Vite的默认端口5173
    return checkPort(5173) ? 5173 : 
           checkPort(5174) ? 5174 : 
           checkPort(5175) ? 5175 : 5173;
  } catch {
    return 5173;
  }
}

function checkPort(port) {
  try {
    const net = require('net');
    const server = net.createServer();
    server.listen(port);
    server.close();
    return true;
  } catch {
    return false;
  }
}

const HOST = `http://localhost:${detectVitePort()}`;
console.log(`⏳ 等待开发服务器启动: ${HOST}`);
