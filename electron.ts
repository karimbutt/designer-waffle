import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

function createWindow(): void {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const url: string = isDev
    ? 'http://localhost:3000' // URL for the dev server
    : `file://${path.join(__dirname, '../build/index.html')}`; // URL for the production build

  win.loadURL(url);
}

app.on('ready', createWindow);
