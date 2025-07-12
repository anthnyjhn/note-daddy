const { ipcRenderer } = require('electron');

document.querySelector('.close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-window');
});
