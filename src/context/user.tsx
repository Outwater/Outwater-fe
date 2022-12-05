import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { request } from '../api/request';
import { User } from '../types/user';

type UserState = {
  user: User | null;
  accessToken: string;
};
type UserAction = {
  login: (id: string, password: string) => void;
};
export const UserStateContext = createContext<UserState | null>(null);
export const UserActionsContext = createContext<UserAction>({
  login: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    user: null,
    accessToken: '',
  });

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
    } catch (err) {
      console.error(err);
      throw new Error('Login 요청 중 에러 발생');
    }
  };

  const actions = { login };
  return (
    <UserStateContext.Provider value={user}>
      <UserActionsContext.Provider value={actions}>{children}</UserActionsContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
