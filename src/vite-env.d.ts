/// <reference types="vite/client" />

interface AppInfo {
  name: string;
  runtime: string;
  versions: {
    chrome: string;
    electron: string;
    node: string;
  };
}

interface Window {
  appInfo: AppInfo;
}
