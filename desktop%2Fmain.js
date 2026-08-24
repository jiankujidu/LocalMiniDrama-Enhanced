const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 加载前端应用
  mainWindow.loadFile(path.join(__dirname, '../frontweb/dist/index.html'));

  // 开发模式下打开 DevTools
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startBackend() {
  const backendPath = path.join(__dirname, '../backend-node/src/server.js');
  
  backendProcess = spawn(process.execPath, [backendPath], {
    stdio: 'inherit',
    detached: false
  });

  backendProcess.on('error', (err) => {
    console.error('Backend error:', err);
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) {
      backendProcess.kill();
    }
    app.quit();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});

// IPC 处理
ipcMain.on('get-backend-port', (event) => {
  event.reply('backend-port', 3000);
});

ipcMain.on('open-devtools', () => {
  if (mainWindow) {
    mainWindow.webContents.openDevTools();
  }
});
