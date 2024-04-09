import { IUpdateUser, IUser } from "@/types";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// 1. Define the AuthContext type.
type AuthContextType = {
  user: IUser | null;
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (values: { name: string; username: string; email: string; password: string }) => Promise<void>;
  updateUser: (values: IUpdateUser) => Promise<void>;
  isUserLoading?: boolean;
  isAuthenticated: () => boolean;
};

// 2. Create the AuthContext.
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  updateUser: async () => {},
  isUserLoading: false,
  isAuthenticated: () => false,
});

// 3. Create an AuthProvider component.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("http://localhost:3000/api/getCurrentUser")
        .then((response) => {setUser(response.data);})
        .catch((error) => {console.error('Error getting current user:', error);
         setUser(null);
         localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
      });
    }
  }, []);


  async function login(values: { email: string; password: string }) {
    try {
    const response = await axios.post("http://localhost:3000/api/login", values);
    const { user, token } = response.data;
    setUser(user);
    localStorage.setItem("token", token);
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

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);

