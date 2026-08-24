const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getBackendPort: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('backend-port', (event, port) => {
        resolve(port);
      });
      ipcRenderer.send('get-backend-port');
    });
  },
  openDevTools: () => {
    ipcRenderer.send('open-devtools');
  }
});
