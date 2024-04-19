import { useState, useEffect } from 'react';
import { IUser } from '@/types';
import useRefreshToken from './useRefreshToken';
import instance from '../axiosConfig';



const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { refresh } = useRefreshToken();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      instance.get('/getCurrentUser', { withCredentials: true})
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error getting current user:', error);
        setUser(null);
        localStorage.removeItem('accessToken');
        setIsUserLoading(false);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
    } else {
      setIsUserLoading(false);
    }
  }, []);

  return { user, isUserLoading, refresh }
};

export default useAuth;


