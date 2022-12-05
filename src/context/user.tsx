import React, { createContext, useState, ReactNode } from 'react';
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

  const login = () => {};

  const actions = { login };
  return (
    <UserStateContext.Provider value={user}>
      <UserActionsContext.Provider value={actions}>{children}</UserActionsContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
