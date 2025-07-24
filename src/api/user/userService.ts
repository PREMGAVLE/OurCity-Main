import axios from '@/api/axiosInstance';
import { USER_URL, getUserChatListUrl } from '../urls';
import { User, UserChatList } from "./types";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(USER_URL);
  return response.data;
};

export const getUserChatList = async (userId: string): Promise<UserChatList[]> => {
  const url = getUserChatListUrl(userId);
  const response = await axios.get<UserChatList[]>(url);
  return response.data;
};
