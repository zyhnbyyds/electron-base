import { contextBridge, ipcRenderer } from 'electron'

const IPC_CHANNELS = {
  getAppInfo: 'system:get-app-info',
  openExternal: 'shell:open-external',
} as const

contextBridge.exposeInMainWorld('desktop', {
  isElectron: true,
  getAppInfo: () => ipcRenderer.invoke(IPC_CHANNELS.getAppInfo),
  openExternal: (url: string) => ipcRenderer.invoke(IPC_CHANNELS.openExternal, url),
})
