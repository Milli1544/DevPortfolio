import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGNIN, {
        email,
        password,
      });

      const { token: newToken, user: userData } = response.data;

      setToken(newToken);
      setUser(userData);

      try {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGNUP, {
        name,
        email,
        password,
      });

      const { token: newToken, user: userData } = response.data;

      setToken(newToken);
      setUser(userData);

      try {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAdmin,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
