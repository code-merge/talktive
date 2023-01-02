const { app, BrowserWindow, Notification, ipcMain, Menu } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
const dockIcon = path.join(__dirname, "assets", "logo.png");

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 600,
    backgroundColor: "white",
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
}

function createSplashWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 600,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  const loadFilePath = path.join(__dirname, "splash.html");

  window.loadFile(loadFilePath);

  if (isDev) {
    window.webContents.openDevTools();
  }
}

function createMenu() {
  const template = require("./appUtils/Menu").createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
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

app.whenReady().then(() => {
  createMenu();
  createMainWindow();
  //createSplashWindow();
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
