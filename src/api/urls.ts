export const USER_URL='/users';
export const LOGIN_URL='/api/auth/register';
export const OTP_URL='/api/auth/verifyOtp';
export const getUserChatListUrl = (userId: string) =>
  `/api/chat/full-chat-list/${userId}?markRead=false`;
export const getChatUser_Url = (currentUserId: string) => `/api/chat/full-chat-list/${currentUserId}`;
export const getChatReciever_info = (receiverId: string) => `/api/chat/full-chat-list/${receiverId}`;

export const getMessagesUrl = (currentUserId: string, receiverId: string) =>
  `/api/chat/messages/${currentUserId}/${receiverId}`;
export const getMarkReadUrl = (currentUserId: string) => `/api/chat/markRead/${currentUserId}`;
export const getSearchUserByPhoneUrl = (phone_number: string) =>
  `/api/auth/search?phone_number=${phone_number}`;

