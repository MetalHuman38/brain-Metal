import { useState, useEffect } from 'react';
import { IUser } from '@/types';
import instance from '@/lib/axiosConfig';

const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  
  useEffect(() => {
      
      instance.get('/handleCurrentUser',)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error getting current user:', error);
        setUser(null);
        setIsUserLoading(false);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, []);

  return { user, isUserLoading }
};

export default useAuth;



