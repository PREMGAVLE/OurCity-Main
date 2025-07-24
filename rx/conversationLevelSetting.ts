import { db } from './db';
import { ConversationSetting } from './type';


// Get settings for a conversation; returns undefined if none exists
export async function getConversationSetting(
  conversationId: string
): Promise<ConversationSetting | undefined> {
  return await db.conversationSettings.get(conversationId);
}

// Initialize settings with defaults if not exist
export async function initConversationSetting(
  conversationId: string,
  defaults?: Partial<Omit<ConversationSetting, 'conversationId' | 'updatedAt'>>
): Promise<ConversationSetting> {
  const existing = await db.conversationSettings.get(conversationId);
  if (existing) return existing;
  const now = new Date().toISOString();
  const setting: ConversationSetting = {
    conversationId,
    muted: defaults?.mute ?? false,
    pinned: defaults?.pinned ?? false,
    archived: defaults?.archived ?? false,
    customTitle: defaults?.customTitle ?? undefined,
    lastReadTimestamp: defaults?.lastReadTimestamp ?? now,
    themeOverride: defaults?.themeOverride ?? undefined,
    updatedAt: now,
  };
  await db.conversationSettings.add(setting);
  return setting;
}

// Update one or more fields
export async function updateConversationSetting(
  conversationId: string,
  updates: Partial<Omit<ConversationSetting, 'conversationId'>>
): Promise<ConversationSetting | undefined> {
  const now = new Date().toISOString();
  const existing = await db.conversationSettings.get(conversationId);
  if (!existing) {
    // Optionally initialize if not exist
    return await initConversationSetting(conversationId, updates as any);
  }
  const merged = { ...existing, ...updates, updatedAt: now };
  await db.conversationSettings.put(merged);
  return merged;
}

// Delete conversation settings (e.g., when deleting conversation)
export async function deleteConversationSetting(conversationId: string): Promise<void> {
  await db.conversationSettings.delete(conversationId);
}

// Get all conversation settings (e.g., to list muted or pinned convs)
export async function getAllConversationSettings(): Promise<ConversationSetting[]> {
  return await db.conversationSettings.toArray();
}

// Example query: get all muted conversation IDs
export async function getMutedConversations(): Promise<ConversationSetting[]> {
  return await db.conversationSettings.where('mute').equals(true).toArray();
}