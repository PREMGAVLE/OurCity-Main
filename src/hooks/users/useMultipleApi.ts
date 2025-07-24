// useDashboardApi.ts
import { useState } from 'react';
import { useApiState } from '../apis/useApiState';
import { getUsers } from '@/api/user/userService';
import { getUserChatList } from '@/api/user/userService';


export const useDashboardApi = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [chatList, setChatList] = useState([]);
   const chatListState = useApiState();


  const userState = useApiState();
  const postState = useApiState();

  const fetchUsers = async () => {
    userState.start();
    try {
      const data: any = await getUsers();
      setUsers(data);
      userState.success();
    } catch (err) {
      userState.fail(err);
    }
  };

  const fetchPosts = async () => {
    postState.start();
    try {
      const data = await getPosts();
      setPosts(data);
      postState.success();
    } catch (err) {
      postState.fail(err);
    }
  };

  const fetchChatList = async (userId: string) => {
  chatListState.start();
  try {
    const data = await getUserChatList(userId);
    // console.log(data?.data,"dattttttttttttaaaaaaaaaatttttttta")
    setChatList(data?.data);
    chatListState.success();
  } catch (err) {
    chatListState.fail(err);
  }
};

return {
  users,
  posts,
  chatList,

  userLoading: userState.loading,
  userError: userState.error,

  postLoading: postState.loading,
  postError: postState.error,

  chatListLoading: chatListState.loading,
  chatListError: chatListState.error,

  fetchUsers,
  fetchPosts,
  fetchChatList, // Call this with userId
};

};