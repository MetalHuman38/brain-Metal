import { useState, useEffect } from 'react';
import { IUser } from '@/types';
import instance from '@/lib/axiosConfig';

const useAuth = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
  
    useEffect(() => {
        // Fetch the user data from the server
        const storedToken = localStorage.getItem('token')
        const fetchUser = async () => {
            try {
                const response = await instance.get('/currentUser', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                
            } catch (error) {
                console.error('Error getting current user:', error);
                setUser(null);
            } finally {
                setIsUserLoading(false);
            }
        };
        fetchUser();
    }, []);

    return { user, isUserLoading };
};

export default useAuth;


// const useAuth = () => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isUserLoading, setIsUserLoading] = useState(true);
  
//   useEffect(() => {
//     // set cookie with jwt token
//     instance.get('/getCurrentUser', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//     })
//     .then((response) => {
//         setUser(response.data.user);
//     })
//     .catch(error => {
//         console.error('Error getting current user:', error);
//         setUser(user);
//         setIsUserLoading(false);
//     })
//     .finally(() => {
//         setIsUserLoading(false);
//     });
// }, []);

// return { user, isUserLoading }
// };

// export default useAuth;



