import { useUserContext } from './AuthContext';
import instance from '../axiosConfig';


const useRefreshToken = () => {
    const { setAuth } = useUserContext();

  const refresh = async () => {
    try {

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            console.error('No refresh token found');
            return;
        }

      // Make a request to the server to refresh the token
      const response = await instance.get('/refreshToken',  {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        },
        withCredentials: true // Ensure credentials are sent along with the request
      });

      // Assuming response.data contains the new access token
      const { accessToken, user } = response.data;

      setAuth(user);
      console.log('New access token:', accessToken);

      // Save the new access token in localStorage
      localStorage.setItem('accessToken', accessToken);

      return accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  return { refresh };
};

export default useRefreshToken;
