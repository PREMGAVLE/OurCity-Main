// src/types/user.ts
export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserChatList = {
  _id: string;
  display_name: string;
  userName: string;
  phone_number: string;
  email_id: string;
  dp: string;
  nick_name: string;
  last_name: string;
  location: string;
  home: string;
  work: string;
  website: string;
  current_status: string;
  status_message: string;
  last_seen: string; // ISO date string
  online_status: 'online' | 'offline';
  connection_chain: string;
  subscription: Record<string, any>; // or define Subscription type if you know it
  circle: any[]; // Define type instead of `any` if known
  social_media: any[];
  verified_as: any[];
};
