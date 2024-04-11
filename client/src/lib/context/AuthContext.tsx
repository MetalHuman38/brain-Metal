

// import { IUpdateUser, IUser } from "@/types";
// import axios from "axios";
// import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";



// // 1. Define the AuthContext type.
// type AuthContextType = {
//   user: IUser | null;
//   login: (values: { email: string; password: string }) => Promise<void>;
//   logout: () => void;
//   register: (values: { name: string; username: string; email: string; password: string }) => Promise<void>;
//   updateUser: (values: IUpdateUser) => Promise<void>;
//   isUserLoading?: boolean;
//   isSuccess?: boolean;
//   isAuthenticated: () => boolean;
//   setisUserLoading: (value: boolean) => void;
// };

// // 2. Create the AuthContext.
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: async () => {},
//   logout: () => {},
//   register: async () => {},
//   updateUser: async () => {},
//   isUserLoading: false,
//   isSuccess: false,
//   isAuthenticated: () => false,
//   setisUserLoading: () => {},
// });

// // 3. Create an AuthProvider component.
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isUserLoading, setisUserLoading] = useState(false);
//   const navigate = useNavigate();
  
  
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setisUserLoading(true);
//       axios.get("http://localhost:3000/api/getCurrentUser")
//         .then((response) => {setUser(response.data);})
//         .catch((error) => {
//           console.error('Error getting current user:', error);
//           setUser(null);
//           localStorage.removeItem("accessToken");
//           delete axios.defaults.headers.common["Authorization"];
//         })
//         .finally(() => {
//           setisUserLoading(false);
//         });
//     } else {
//       setUser(null);
//     }
//   }, []);

//   async function login(values: { email: string; password: string }) {
//     try {
//     const response = await axios.post("http://localhost:3000/api/login", values);
//     const { tokenResponse } = response.data;
//     const { user, token } = tokenResponse;
//     localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse)); 
//     setUser(user);
//     localStorage.setItem("accessToken", token);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     navigate("/");
//   } catch (error) {
//     console.error('Error logging in user:', error);
//   }
// }

  
//   async function logout() {
//     setUser(null);
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//     navigate("/sign-in");
//   }

//   async function register(values: { name: string; username: string; email: string; password: string }) {
//     await axios.post("http://localhost:3000/api/register", values);
//   }

//   async function updateUser(values: IUpdateUser) {
//     const response = await axios.put(`/api/users/${values.userId}`, values);
//     setUser(response.data);
//   }

//   function isAuthenticated() {
//     return !!user;
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register, updateUser, isAuthenticated, setisUserLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// export const useUserContext = () => useContext(AuthContext);



import { IUpdateUser, IUser, INewPost } from "@/types";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



// 1. Define the AuthContext type.
type AuthContextType = {
  user: IUser | null;
  posts: INewPost[];
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (values: { name: string; username: string; email: string; password: string }) => Promise<void>;
  createPost: (values: { Caption: string; File: []; Tags: string; Location: string }) => Promise<INewPost | null>;
  updateUser: (values: IUpdateUser) => Promise<void>;
  isUserLoading?: boolean;
  isPostLoading?: boolean;
  isSuccess?: boolean;
  isAuthenticated: () => boolean;
  setisUserLoading: (value: boolean) => void;
  setisPostLoading: (value: boolean) => void;
};

// 2. Create the AuthContext.
const AuthContext = createContext<AuthContextType>({
  user: null,
  posts: [],
  login: async () => {},
  logout: () => {},
  register: async () => {},
  createPost: async () => null,
  updateUser: async () => {},
  isUserLoading: false,
  isPostLoading: false,
  isSuccess: false,
  isAuthenticated: () => false,
  setisUserLoading: () => {},
  setisPostLoading: () => {},
});

// 3. Create an AuthProvider component.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<INewPost[]>([]);
  const [isUserLoading, setisUserLoading] = useState(false);
  const [isPostLoading, setisPostLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setisUserLoading(true);
      axios.get("http://localhost:3000/api/getCurrentUser")
        .then((response) => {setUser(response.data);})
        .catch((error) => {
          console.error('Error getting current user:', error);
          setUser(null);
          localStorage.removeItem("accessToken");
          delete axios.defaults.headers.common["Authorization"];
        })
        .finally(() => {
          setisUserLoading(false);
        });
    } else {
      setUser(null);
    }
  }, []);

   useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if(token) {
      setisPostLoading(true);
      axios.get("http://localhost:3000/api/getRecentPosts")
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error('Error getting posts:', error);
          setPosts([]);
          localStorage.removeItem("accessToken");
        })
        .finally(() => {
          setisPostLoading(false);
        });
    } else{
      setPosts([]);
    }
   }, [user]);

  async function login(values: { email: string; password: string }) {
    try {
    const response = await axios.post("http://localhost:3000/api/login", values);
    const { tokenResponse } = response.data;
    const { user, token } = tokenResponse;
    localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse)); 
    setUser(user);
    localStorage.setItem("accessToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    navigate("/");
  } catch (error) {
    console.error('Error logging in user:', error);
  }
}

  
  async function logout() {
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/sign-in");
  }

  async function register(values: { name: string; username: string; email: string; password: string }) {
    await axios.post("http://localhost:3000/api/register", values);
  }

  async function updateUser(values: IUpdateUser) {
    const response = await axios.put(`/api/users/${values.userId}`, values);
    setUser(response.data);
  }

  function isAuthenticated() {
    return !!user;
  }

  async function createPost(values: { Caption: string; File: []; Tags: string; Location: string }) {
    try {
      const response = await axios.post("http://localhost:3000/api/createPost", values);
      setisSuccess(true);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      setisSuccess(false);
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user,
      posts,
      login, 
      logout, 
      register, 
      createPost,
      updateUser,
      isUserLoading,
      isPostLoading,
      isSuccess,
      isAuthenticated, 
      setisUserLoading, 
      setisPostLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);

