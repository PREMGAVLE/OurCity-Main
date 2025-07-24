import { db } from './db';

export enum MessageDirection {
  Incoming = "incoming",
  Outgoing = "outgoing",
  Receiver = "Receiver"
}

export type Message = {
  id: string;
  sender: string;
  direction: MessageDirection;
  content: string | string[] | { url: string; name: string; type: string }[];
  message_type: "text" | "image" | "audio" | "file" | 'checkin'| 'checkout';
  timestamp: string;
  sender_id:string
  conversationId:string;
};


// Function to send a message
export async function sendMessage(message: Message) {
  await db.messages.add(message);
  return message;
}

/**
 * Function to send multiple messages in bulk.
 * @param messages Array of Message objects to store.
 * @returns The array of messages attempted to be stored.
 */
export async function sendBulkMessages(messages: Message[]): Promise<Message[]> {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [];
  }
  try {
    // Use Dexie bulkAdd for efficient insertion
    await db.messages.bulkAdd(messages);
    return messages;
  } catch (error) {
    console.error("Failed to bulk add messages:", error);
    // Fallback: add individually if bulkAdd fails
    const results: Message[] = [];
    for (const msg of messages) {
      try {
        await db.messages.add(msg);
        results.push(msg);
      } catch (err) {
        console.error("Failed to add message in fallback:", msg, err);
      }
    }
    return results;
  }
}

// Function to get all messages ordered by timestamp
export async function getMessages() {
  return await db.messages.orderBy('timestamp').toArray();
}

/**
 * Function to get messages for a specific conversation ordered by timestamp.
 * @param conversationId The ID of the conversation to filter messages.
 * @returns Array of Message objects for the specified conversation ordered by timestamp.
 */
export async function getMessagesByConversation(conversationId: string) {
 
  return await db.messages
    .where('conversationId')
    .equals(`${conversationId}`)
    .sortBy('timestamp');
}