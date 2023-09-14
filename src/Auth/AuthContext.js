import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Perform any initial authentication checks here
    const initialAuthCheck = async () => {
      try {
        // Check for the presence of user data or a valid token
        const user = JSON.parse(localStorage.getItem("user"));
        const isAuthenticated = user && user.accessToken ? true : false;
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error("Error checking initial authentication:", error);
      }
    };

    initialAuthCheck();
  }, []);

  const login = (tokens) => {
    localStorage.setItem("user", JSON.stringify(tokens));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
