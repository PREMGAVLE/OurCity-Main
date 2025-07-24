import { getVersion } from "@tauri-apps/api/app";

/**
 * Checks if the app is running inside a Tauri environment.
 * @returns Promise<boolean>
 */
export const isTauri = async (): Promise<boolean> => {
  try {
    await getVersion();
    return true;
  } catch {
    return false;
  }
};
