const { app, BrowserWindow } = require('electron')

function createMainWindow(){

    const window = new BrowserWindow({

        width: 800,
        height: 600,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true
        }        
    })

    window.loadFile('index.html');
}

app.whenReady().then(createMainWindow);

//Window behavior handling for MacOs.

app.on('window-all-closed', () => {

    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', () => {

    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow();
    }
})