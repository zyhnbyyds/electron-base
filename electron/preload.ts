import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('appInfo', {
  name: 'tt',
  runtime: 'Electron',
  versions: {
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node
  }
});
