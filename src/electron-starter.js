const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron');




const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // and load the index.html of the app.
    //mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    //listen event emit
    ipcMain.handle('dark-mode:upload-file', () => {
        // If the platform is 'win32' or 'Linux'
        if (process.platform !== 'darwin') {
            // Resolves to a Promise<Object>
            dialog.showOpenDialog({
                title: 'Select the File to be uploaded',
                defaultPath: path.join(__dirname, '../assets/'),
                buttonLabel: 'Upload',
                // Restricting the user to only Text Files.
                filters: [
                    {
                        name: 'Text Files',
                        extensions: ['xlsx']
                    },],
                // Specifying the File Selector Property
                properties: ['openFile']
            }).then(file => {
                // Stating whether dialog operation was
                // cancelled or not.
                console.log(file.canceled);
                if (!file.canceled) {
                    // Updating the GLOBAL filepath variable 
                    // to user-selected file.
                    global.filepath = file.filePaths[0].toString();
                    console.log(global.filepath);
                }
            }).catch(err => {
                console.log(err)
            });
        }

    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.