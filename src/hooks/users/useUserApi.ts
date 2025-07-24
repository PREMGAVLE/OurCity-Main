// src/hooks/useUserApi.ts
import { User } from '@/api/user/types';
import { useState } from 'react';
import { useApiState } from '../apis/useApiState';
import { getUsers } from '@/api/user/userService';



export const useUserApi = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { loading, error, start, success, fail } = useApiState();

  const fetchUsers = async () => {
    start();

    try {
        // INFO: Main api call you can shift this in service or platform 
      const data = await getUsers();
      setUsers(data);
      success();
    } catch (err) {
      fail(err);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
};