
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron_preload', {

    notificationApi:{
        sendNotification(message) {
            ipcRenderer.send('notify', message);
        }
    },

    batteryApi:{

    }
})