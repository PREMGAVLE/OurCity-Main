import { db } from "./db";

export interface ConversationType {
  id?: string;
  name: string;
  address: string;
  location: string;
  lat: number;
  lng: number;
  building: string;
  floor_no: string;
  room_no: string;
  gender: string;
  incharges: {
    name: string;
    email: string;
    phone: string;
  }[];
  attendanceIncharges: any[];
  photos: any[];
  tag?:"all" |  "hostels" | 'groups'| 'split_money';
  participants?: string[];
  participantKey?: string;
  lastMessageTimestamp?: string;
  isGroup?: boolean;
  cid:any;
  conversation_id:string
}
export async function addConversation(conversation: ConversationType) {
  console.log("***************",conversation)
  await db.conversations.add({
    participantKey: conversation.participantKey || conversation.id || '',
    name: conversation.name,
    address: conversation.address,
    location: conversation.location,
    lat: conversation.lat,
    lng: conversation.lng,
    building: conversation.building,
    floor_no: conversation.floor_no,
    room_no: conversation.room_no,
    gender: conversation.gender,
    incharges: conversation.incharges,
    attendanceIncharges: conversation.attendanceIncharges,
    photos: conversation.photos,
    tag:conversation.tag || 'all',
    cid:conversation?.cid,
    conversation_id:conversation.participantKey || conversation.id || '',
  });
}
// get convartion list 
export async function getAllConversation(): Promise<ConversationType[]> {
  return await db.conversations.toArray();
}
// get by tag name
export async function getConversationByTag(tag: string): Promise<ConversationType[]> {
  return await db.conversations.where('tag').equals(tag).toArray();
}

export function makeParticipantKey(userA: string, userB: string): string {
  return [userA, userB].sort().join('_');
}
export async function getOrCreateOneToOneConversation(
  userA: string,
  userB: string
): Promise<(ConversationType & { id: string })> {
  console.log("getOrCreateOneToOneConversation>>>>",userA,userB)
  const key = makeParticipantKey(userA, userB);
  const existing = await db.conversations.where('participantKey').equals(key).first();
  console.log("getOrCreateOneToOneConversation existing>>>>",existing)
  if (existing) return existing as ConversationType & { id: string };
  const newConv: Omit<ConversationType, 'id'> = {
   
    participants: [userA, userB],
    participantKey: key,
    name:userB,
    lastMessageTimestamp: new Date().toISOString(),
    isGroup: false,
    conversation_id:key
 
   
  };
   console.log("getOrCreateOneToOneConversation 00000>>>>",newConv)
  const id = await db.conversations.add(newConv);
   console.log("getOrCreateOneToOneConversation 2222>>>>",id,{ ...newConv, id: key, cid: key })
  return { ...newConv, id: key, cid: key };
}