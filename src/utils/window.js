const { BrowserWindow, screen, session, desktopCapturer } = require('electron');
const path = require('node:path');
const { applyStealthMeasures, startTitleRandomization } = require('./stealthFeatures');

function createWindow(randomNames = null) {

    let windowWidth = 800
    let windowHeight = 600

    const mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        frame: false,
        transparent: true,
        hasShadow: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        hiddenInMissionControl: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false,
            enableBlinkFeatures: 'GetDisplayMedia',
            webSecurity: true,
            allowRunningInsecureContent: false,
        },
        backgroundColor: '#00000000',
    });

    mainWindow.setResizable(true);
    mainWindow.setContentProtection(true);
    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
    const x = Math.floor((screenWidth - windowWidth) / 2);
    const y = Math.floor((screenHeight - windowHeight) / 2);;

    mainWindow.setPosition(x, y);

    session.defaultSession.setDisplayMediaRequestHandler(
        (req, callback) => {
            desktopCapturer.getSources({ types: ['screen'] }).then(sources => {
                callback({ video: sources[0], audio: 'loopback' });
            });
        },
        { useSystemPicker: true }
    );

    if (process.platform === 'win32') {
        mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
    }

    mainWindow.loadFile(path.join(__dirname, '../index.html'));

    if (randomNames && randomNames.windowTitle) {
        mainWindow.setTitle(randomNames.windowTitle);
    }

    applyStealthMeasures(mainWindow);
    startTitleRandomization(mainWindow);

    return mainWindow;
}

module.exports = {
    createWindow
};