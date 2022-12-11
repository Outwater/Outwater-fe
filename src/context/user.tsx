import React, { createContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { request } from '../api/request';
import { User } from '../types/user';
import useStorage from '../hooks/useStorage';

type UserState = {
  user: User | null;
  accessToken: string;
};
type UserAction = {
  login: (id: string, password: string) => void;
  logout: () => void;
};
export const UserStateContext = createContext<UserState | null>(null);
export const UserActionsContext = createContext<UserAction>({
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { getItem, setItem, removeItem } = useStorage('local');
  const [user, setUser] = useState({
    user: null,
    accessToken: '',
  });

  useEffect(() => {
    setUser(
      getItem('user', {
        user: null,
        accessToken: '',
      })
    );
  }, []);

  const login = async (id: string, password: string) => {
    try {
      const { data } = await request('/login', {
        method: 'POST',
        body: JSON.stringify({ id, password }),
      });
      setUser({
        ...user,
        user: data.user,
        accessToken: data.accessToken,
      });
      setItem('user', data);
    } catch (err) {
      console.error(err);
      throw new Error('Login 요청 중 에러 발생');
    }
  };

  const logout = () => {
    setUser({
      user: null,
      accessToken: '',
    });
    removeItem('user');
  };
  const actions = useMemo(() => ({ login, logout }), []);
  return (
    <UserStateContext.Provider value={user}>
      <UserActionsContext.Provider value={actions}>{children}</UserActionsContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
