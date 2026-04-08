import { contextBridge, ipcRenderer } from 'electron'

const IPC_CHANNELS = {
  getAppInfo: 'system:get-app-info',
  openExternal: 'shell:open-external',
  getWindowState: 'window:get-state',
  minimizeWindow: 'window:minimize',
  toggleMaximizeWindow: 'window:toggle-maximize',
  closeWindow: 'window:close',
  windowStateChanged: 'window:state-changed',
} as const

contextBridge.exposeInMainWorld('desktop', {
  isElectron: true,
  getAppInfo: () => ipcRenderer.invoke(IPC_CHANNELS.getAppInfo),
  openExternal: (url: string) => ipcRenderer.invoke(IPC_CHANNELS.openExternal, url),
  getWindowState: () => ipcRenderer.invoke(IPC_CHANNELS.getWindowState),
  minimizeWindow: () => ipcRenderer.invoke(IPC_CHANNELS.minimizeWindow),
  toggleMaximizeWindow: () => ipcRenderer.invoke(IPC_CHANNELS.toggleMaximizeWindow),
  closeWindow: () => ipcRenderer.invoke(IPC_CHANNELS.closeWindow),
  onWindowStateChange: (
    listener: (state: { isMaximized: boolean; isMinimized: boolean }) => void,
  ) => {
    const wrapped = (
      _event: Electron.IpcRendererEvent,
      state: { isMaximized: boolean; isMinimized: boolean },
    ) => {
      listener(state)
    }

    ipcRenderer.on(IPC_CHANNELS.windowStateChanged, wrapped)

    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.windowStateChanged, wrapped)
    }
  },
})
