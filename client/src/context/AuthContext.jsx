import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  useEffect(() => {
    try {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    } catch (error) {
      console.error("Error setting up axios defaults:", error);
    }
  }, [token]);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // You could add an endpoint to verify token and get user info
          // For now, we'll just check if token exists
          const userData = localStorage.getItem("user");
          if (userData) {
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          // Don't call logout here as it might cause infinite loops
          setToken(null);
          setUser(null);
          try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } catch (localStorageError) {
            console.error(
              "Error removing from localStorage:",
              localStorageError
            );
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          password,
        }
      );

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
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

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
