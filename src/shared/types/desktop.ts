export interface DesktopAppInfo {
  name: string
  runtime: string
  platform: string
  versions: {
    chrome: string
    electron: string
    node: string
  }
}

export interface DesktopWindowState {
  isMaximized: boolean
  isMinimized: boolean
}

export interface DesktopWindowControls {
  minimize: () => Promise<void>
  toggleMaximize: () => Promise<DesktopWindowState | undefined>
  close: () => Promise<void>
}

export interface DesktopApi {
  isElectron: boolean
  getAppInfo: () => Promise<DesktopAppInfo>
  openExternal: (url: string) => Promise<boolean>
  getWindowState: () => Promise<DesktopWindowState>
  minimizeWindow: () => Promise<void>
  toggleMaximizeWindow: () => Promise<DesktopWindowState | undefined>
  closeWindow: () => Promise<void>
  onWindowStateChange: (listener: (state: DesktopWindowState) => void) => () => void
}

declare global {
  interface Window {
    desktop?: DesktopApi
  }
}
