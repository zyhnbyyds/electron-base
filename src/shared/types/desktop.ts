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

export interface DesktopApi {
  isElectron: boolean
  getAppInfo: () => Promise<DesktopAppInfo>
  openExternal: (url: string) => Promise<boolean>
}

declare global {
  interface Window {
    desktop?: DesktopApi
  }
}
