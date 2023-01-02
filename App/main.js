const {
  app,
  BrowserWindow,
  Notification,
  ipcMain,
  Menu,
  Tray,
} = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
const dockIcon = path.join(__dirname, "assets", "logo.png");
const trayIcon = path.join(__dirname, "assets", "logo.png");
const template = require("./appUtils/Menu").createTemplate(app);
const menu = Menu.buildFromTemplate(template);

function createMainWindow() {
  const window = new BrowserWindow({
    width: 991,
    height: 674,
    backgroundColor: "white",
    show: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const loadFilePath = path.join(__dirname, "index.html");

  window.loadFile(loadFilePath);

  if (isDev) {
    window.webContents.openDevTools();
  }

  return window;
}

function createSplashWindow() {
  const window = new BrowserWindow({
    width: 600,
    height: 400,
    backgroundColor: "black",
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  const loadFilePath = path.join(__dirname, "splashScreen", "splash.html");

  window.loadFile(loadFilePath);

  return window;
}

function createMenu() {
  Menu.setApplicationMenu(menu);
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
  });
}

//Dock Icon for MAC machines

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}

let tray = null;

app.whenReady().then(() => {
  createMenu();

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);

  const splash = createSplashWindow();
  const mainWindow = createMainWindow();

  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      mainWindow.show();
    }, 2000);
  });
});

//Window behavior handling for MacOs.

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

ipcMain.on("app-quit", () => {
  app.quit();
});

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Talktive", body: message }).show();
});
