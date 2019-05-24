const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('_windows/index.html');

  win.once('ready-to-show', () => {
    win.show();
  });

  win.once('closed', function () {
    win = null;
    process.exit();
  });
}

app.once('ready', createWindow);

app.once('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.once('activate', function () {
  if (win === null) createWindow();
});