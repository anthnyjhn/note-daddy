const { app, BrowserWindow } = require('electron/main')
const { ipcMain } = require('electron');

const { createWindow } = require('./utils/window');
const { initializeRandomProcessNames } = require('./utils/processRandomizer');

const randomNames = initializeRandomProcessNames();

function createMainWindow() {
    mainWindow = createWindow(randomNames);
    return mainWindow;
}

app.whenReady().then(async () => {
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('close-window', () => {
    BrowserWindow.getFocusedWindow().close();
});

