import Dexie, { Table } from 'dexie';


import { ConversationType } from './conversations';
import { Message } from './messages';
import { GlobalSetting, ConversationSetting, FeatureItem } from './type';

export class SIMFLODB extends Dexie {

  conversations!: Table<ConversationType, number>;
  messages!: Table<Message, number>;
  globalSettings!: Table<GlobalSetting, string>;
  conversationSettings!: Table<ConversationSetting, string>;
  features!: Table<FeatureItem, number>;

  constructor() {
    super('SIMFLODB');

    this.version(1).stores({

      conversations: '++id'
    });

    this.version(2).stores({
      conversations: '++id, tag'
    });

    this.version(3).stores({
      conversations: '++id, tag',
      messages: '++id'
    });

    this.version(4).stores({
      conversations: '++id, tag',
      messages: '++id, conversationId, timestamp'
    });
    this.version(5).stores({
      conversations: '++id, tag, participantKey, lastMessageTimestamp',
      messages: '++id, conversationId, timestamp'
    });
    this.version(7).stores({
      conversations: "++id, &participantKey, lastMessageTimestamp, tag",
      messages: "++id, conversationId, timestamp",
      globalSettings: '&key, updatedAt',
      conversationSettings: '&conversationId, mute, pinned, archived, lastReadTimestamp',
    });
    this.version(8).stores({
      conversations: "++id, &participantKey, lastMessageTimestamp, tag",
      messages: "++id, conversationId, timestamp",
      globalSettings: "&key, updatedAt",
      conversationSettings: "&conversationId, mute, pinned, archived, lastReadTimestamp",
      features: "++id, name, icon, category, *tags"


    });
  }


}

export const db = new SIMFLODB();


export function resetDatabase() {
  return db.transaction('rw', db.conversations, async () => {
    await Promise.all(db.tables.map(table => table.clear()));

  });
}