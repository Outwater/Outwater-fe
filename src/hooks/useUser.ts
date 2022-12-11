import { useContext } from 'react';
import { UserActionsContext, UserStateContext } from '../context/user';

const useUser = () => {
  const userInfo = useContext(UserStateContext);
  const userAction = useContext(UserActionsContext);

  return {
    userInfo,
    userAction,
  };
};

export default useUser;
