const { app, BrowserWindow } = require('electron')

let mainWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 1024,
        height:  728,
        //resizable: false
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // mainWindow.loadURL(`file://${__dirname}/form/index.html`)
    mainWindow.loadURL(`file://${__dirname}/index.html`)

});