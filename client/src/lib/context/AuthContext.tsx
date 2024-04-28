import { IUpdateUser, IUser, INewPost } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";




// 1. Define the AuthContext type.
type AuthContextType = {
  user: IUser | null;
  posts: INewPost[];
  logout: () => void;
  handleUpload: (file: File) => Promise<void>;
  createPost: (values: { Caption: string; ImageURL: string; Tags: string; Location: string }) => Promise<INewPost | null>;
  updateUser: (values: IUpdateUser) => Promise<void>;
  isUserLoading?: boolean;
  isPostLoading?: boolean;
  isImageUploading?: boolean;
  isSuccess?: boolean;
  isAuthenticated: () => boolean;
  setisUserLoading: (value: boolean) => void;
  setisPostLoading: (value: boolean) => void;
  setAuth: Dispatch<SetStateAction<{}>>;
};

// 2. Create the AuthContext.
const AuthContext = createContext<AuthContextType>({
  user: null,
  posts: [],
  logout: () => {},
  createPost: async () => null,
  handleUpload: async () => {},
  updateUser: async () => {},
  isUserLoading: false,
  isPostLoading: false,
  isImageUploading: false,
  isSuccess: false,
  isAuthenticated: () => false,
  setisUserLoading: () => {},
  setisPostLoading: () => {},
  setAuth: () => {},
});



// 3. Create an AuthProvider component.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<INewPost[]>([]);
  const [isUserLoading, setisUserLoading] = useState(false);
  const [isPostLoading, setisPostLoading] = useState(false);
  const [ isAuth, setAuth ] = useState({});
  const [isImageUploading, setisImageUploading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const navigate = useNavigate();



useEffect(() => {
  const accessToken = localStorage.getItem("refreshToken");
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}, []);


  
  async function createPost(values: { Caption: string; ImageURL: string; Tags: string; Location: string }) {
    try {
      const response = await instance.post("/createPost", values);
      setisSuccess(true);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      setisSuccess(false);
      return null;
    }
  }

  // Implement useEffect to get recent posts
useEffect(() => {
  const fetchPosts = async () => {
    const accessToken = localStorage.getItem("refreshToken");
    if (accessToken) {
      setisPostLoading(true);
      try {
        const newPosts = await instance.get("/getPosts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
        setPosts(newPosts.data);
      } catch (error) {
        console.error('Error getting posts:', error);
        setPosts([]);
        localStorage.removeItem("accessToken");
      } finally {
        setisPostLoading(false);
      }
    }
  };
  fetchPosts(); 
}, []);

  // Implement HandleUpload function to upload images and access logged in user token
  async function handleUpload(file: File) {
    setisImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await instance.post('/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log('Upload successful', response.data);
      setisImageUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

   useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setisPostLoading(true);
      instance.get("/getRecentPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setPosts(response.data);
          setisPostLoading(false);
        })
        .catch((error) => {
          console.error('Error getting posts:', error);
          setPosts([]);
          localStorage.removeItem("accessToken");
        })
        .finally(() => {
          setisPostLoading(false);
        });
    } 
   }, [isAuth]);

  
  async function logout() {
    setUser(null);
    localStorage.removeItem("jwt");
    delete instance.defaults.headers.common["Authorization"];
    navigate("/sign-in");
  }

 

  async function updateUser(values: IUpdateUser) {
    const response = await instance.put(`/users/${values.userId}`, values);
    setUser(response.data);
  }

  function isAuthenticated() {
    return !!user;
  }



  return (
    <AuthContext.Provider value={{ 
      user,
      posts, 
      logout, 
      createPost,
      handleUpload,
      updateUser,
      isUserLoading,
      isPostLoading,
      isSuccess,
      isAuthenticated, 
      setisUserLoading, 
      setisPostLoading,
      isImageUploading,
      setAuth,
      
       }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
