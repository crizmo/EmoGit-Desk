const { app, BrowserWindow } = require('electron')

const dotenv = require('dotenv');
dotenv.config();

const RPC = require('discord-rpc');
const rpc = new RPC.Client({
    transport: 'ipc'
})

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    autoHideMenuBar: true,
  })

  mainWindow.loadURL('https://emogit.vercel.app/')
}

rpc.on("ready", () => {
  rpc.setActivity({
      // details: "EmoGit-Desk",
      state: "Commit with Emojis",
      startTimestamp: new Date(),
      largeImageKey: "emogit",
      largeImageText: "Commit with Emojis",
      buttons : [{label : "EmoGit" , url : "https://emogit.vercel.app/"},{label : "Discord" , url : "https://discord.gg/pyvUW9FAWm"}]
  })

  console.log("Successfully activated the RPC")
})

rpc.login({
  clientId: process.env.CLIENT_ID
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})