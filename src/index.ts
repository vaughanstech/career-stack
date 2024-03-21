import { app, BrowserWindow } from "electron";
import { createFile } from "./services/check-file";

let mainWindow: BrowserWindow | null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webgl: false,
      experimentalFeatures: false,
    },
  });

  createFile();

  mainWindow?.loadFile("./src/index.html");

  mainWindow?.on("closed", () => {
    mainWindow = null;
  });
});

app.disableHardwareAcceleration();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
