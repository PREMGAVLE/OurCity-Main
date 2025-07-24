// src/types/tauri.d.ts
export {};

declare global {
  interface Window {
    __TAURI__?: {
      invoke: (cmd: string, args?: any) => Promise<any>;
      // You can add more Tauri APIs here if you use them
    };
  }
}
