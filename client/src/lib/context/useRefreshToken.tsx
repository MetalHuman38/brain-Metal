import { useUserContext } from "./AuthContext";
import instance from '../axiosConfig';

interface IAuthState {
    accessToken: string;
    // Add other properties if needed
}

const useRefreshToken = () => {

    const { setAuth } = useUserContext();

    const refresh = async () => {
        try {
            const response = await instance.get('/refreshToken', {
                withCredentials: true
            });
            setAuth((prev: IAuthState)  => { 
                console.log(JSON.stringify(prev));
                console.log(JSON.stringify(response.data.accessToken));
                return { ...prev, accessToken: response.data.accessToken };
            });
            return response.data.accessToken;   
        }
        catch (error) {
            console.error('Error refreshing token:', error);
        }
    }
  return { refresh };
}

export default useRefreshToken