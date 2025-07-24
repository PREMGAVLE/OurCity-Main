import { db } from './db';
import { GlobalSetting } from './type';


// Get a global setting by key
export async function getGlobalSetting(key: string): Promise<GlobalSetting | undefined> {
  return await db.globalSettings.get(key);
}

// Set or update a global setting
export async function setGlobalSetting<K extends string, V>(
  key: K,
  value: V
): Promise<GlobalSetting> {
  const now = new Date().toISOString();
  let type: string;
  if (typeof value === 'boolean') type = 'boolean';
  else if (typeof value === 'number') type = 'number';
  else if (typeof value === 'string') type = 'string';
  else type = 'object';

  const stringValue = type === 'object' ? JSON.stringify(value) : String(value);

  const setting: GlobalSetting = { key, value: stringValue, type, updatedAt: now };
  await db.globalSettings.put(setting); // put: inserts or updates by primary key
  return setting;
}

// Remove a global setting
export async function deleteGlobalSetting(key: string): Promise<void> {
  await db.globalSettings.delete(key);
}

// Get all global settings
export async function getAllGlobalSettings(): Promise<GlobalSetting[]> {
  return await db.globalSettings.toArray();
}