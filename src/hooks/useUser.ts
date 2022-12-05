import { useContext } from 'react';
import { UserActionsContext, UserStateContext } from '../context/user';

const useUser = () => {
  const user = useContext(UserStateContext);
  const userAction = useContext(UserActionsContext);

  return {
    user,
    userAction,
  };
};

export default useUser;
