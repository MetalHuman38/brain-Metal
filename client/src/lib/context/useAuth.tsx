import { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { IUser } from '@/types';
import useRefreshToken from './useRefreshToken';
import instance from '../axiosConfig';



const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { refresh } = useRefreshToken();
  
  useEffect(() => {
    const currentUserToken = localStorage.getItem('accessToken');
    if (currentUserToken) {
      // Decode the token to get the user object
      const tokenResponse = JSON.parse(localStorage.getItem('tokenResponse') || '');
      const  { user } = tokenResponse.user;
    setUser(user);
    localStorage.setItem("currentUserToken", currentUserToken);
    instance.defaults.headers.common['Authorization'] = `Bearer ${currentUserToken}`;
    instance.get('/getCurrentUser', { headers: { Authorization: `Bearer ${currentUserToken}` } })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error getting current user:', error);
        setUser(null);
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        setIsUserLoading(false);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
    } else {
      setUser(null);
    }
  }, []);

  return { user, isUserLoading, refresh }
};

// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [isUserLoading, setIsUserLoading] = useState(true);
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//     setUser(user);
//     localStorage.setItem("accessToken", token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       axios.get('http://localhost:3000/api/getCurrentUser')
//         .then(response => {
//           setUser(response.data.user); // Assuming the user object is in response.data
//         })
//         .catch(error => {
//           console.error('Error getting current user:', error);
//           setUser(null);
//           localStorage.removeItem('accessToken');
//           delete axios.defaults.headers.common['Authorization'];
//         })
//         .finally(() => {
//           setIsUserLoading(false);
//         });
//     } else {
//       setUser(null);
//       setIsUserLoading(false);
//     }
//   }, []);

//   return { user, isUserLoading };
// };

export default useAuth;


