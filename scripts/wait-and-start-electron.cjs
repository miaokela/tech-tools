// 等待开发服务器启动然后启动 Electron
const { spawn } = require('child_process');
const http = require('http');

// 终止占用端口的进程
function killPortProcess(port) {
  return new Promise((resolve) => {
    spawn('lsof', [`-ti:${port}`], { stdio: 'pipe' })
      .on('exit', (code, signal) => {
        if (code === 0) {
          console.log(`终止端口 ${port} 上的进程...`);
          spawn('kill', ['-9', `$(lsof -ti:${port})`], { 
            shell: true,
            stdio: 'inherit' 
          }).on('exit', () => resolve());
        } else {
          resolve();
        }
      });
  });
}

async function waitAndStartElectron() {
  console.log('等待开发服务器启动...');
  
  // 先清理可能占用端口的进程
  await killPortProcess(5173);
  await killPortProcess(5174);
  await killPortProcess(5175);
  
  // 检查Vite开发服务器是否就绪
  const checkServer = () => {
    return new Promise((resolve) => {
      const req = http.get('http://localhost:5173', (res) => {
        // Vite开发服务器返回200、304或404都表示服务器已启动
        if (res.statusCode === 200 || res.statusCode === 304 || res.statusCode === 404) {
          console.log('开发服务器检测成功');
          resolve(true);
        } else {
          resolve(false);
        }
      });
      
      req.on('error', (err) => {
        resolve(false);
      });
      
      req.setTimeout(1000, () => {
        req.destroy();
        resolve(false);
      });
    });
  };

  // 最多等待30秒
  const maxWaitTime = 30000;
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTime) {
    if (await checkServer()) {
      console.log('开发服务器已启动，启动 Electron...');
      const electron = spawn('npx', ['electron', '.'], {
        stdio: 'inherit',
        shell: true
      });
      
      electron.on('error', (err) => {
        console.error('启动 Electron 失败:', err);
      });
      
      electron.on('exit', (code) => {
        console.log(`Electron 进程退出，代码: ${code}`);
        process.exit(code);
      });
      
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.error('等待开发服务器超时');
  process.exit(1);
}

waitAndStartElectron();