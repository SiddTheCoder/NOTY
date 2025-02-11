import { useEffect } from 'react';
import { useUser } from '../context/UserContext/UserContext';
import { useMode } from '../context/ModeContext/ModeContext';

export const useAuth = () => {
  const { setUser } = useUser();
  const { setMode } = useMode();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      setMode('User');
    }
  }, [setUser, setMode]);
};