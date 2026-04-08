import { app, BrowserWindow, ipcMain, shell } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const IPC_CHANNELS = {
  getAppInfo: 'system:get-app-info',
  openExternal: 'shell:open-external',
  getWindowState: 'window:get-state',
  minimizeWindow: 'window:minimize',
  toggleMaximizeWindow: 'window:toggle-maximize',
  closeWindow: 'window:close',
  windowStateChanged: 'window:state-changed',
} as const

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getWindowState(window: BrowserWindow) {
  return {
    isMaximized: window.isMaximized(),
    isMinimized: window.isMinimized(),
  }
}

function bindWindowStateEvents(window: BrowserWindow) {
  const emitState = () => {
    window.webContents.send(IPC_CHANNELS.windowStateChanged, getWindowState(window))
  }

  window.on('maximize', emitState)
  window.on('unmaximize', emitState)
  window.on('minimize', emitState)
  window.on('restore', emitState)

  window.webContents.once('did-finish-load', emitState)
}

function createWindow() {
  const isWindows = process.platform === 'win32'

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 680,
    frame: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    backgroundColor: '#f3f1eb',
    show: false,
    ...(isWindows
      ? {
          roundedCorners: true,
          thickFrame: true,
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  bindWindowStateEvents(mainWindow)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)
    return { action: 'deny' }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    return
  }

  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle(IPC_CHANNELS.getAppInfo, () => {
  return {
    name: 'Desktop Template',
    runtime: 'Electron',
    platform: process.platform,
    versions: {
      chrome: process.versions.chrome,
      electron: process.versions.electron,
      node: process.versions.node,
    },
  }
})

ipcMain.handle(IPC_CHANNELS.openExternal, async (_event, url: string) => {
  try {
    await shell.openExternal(url)
    return true
  } catch {
    return false
  }
})

ipcMain.handle(IPC_CHANNELS.getWindowState, (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)

  if (!window) {
    return { isMaximized: false, isMinimized: false }
  }

  return getWindowState(window)
})

ipcMain.handle(IPC_CHANNELS.minimizeWindow, (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)

  window?.minimize()
})

ipcMain.handle(IPC_CHANNELS.toggleMaximizeWindow, (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)

  if (!window) {
    return { isMaximized: false, isMinimized: false }
  }

  if (window.isMaximized()) {
    window.unmaximize()
  } else {
    window.maximize()
  }

  return getWindowState(window)
})

ipcMain.handle(IPC_CHANNELS.closeWindow, (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)

  window?.close()
})
