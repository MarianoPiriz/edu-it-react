import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const register = (newUser) => {
    const userDB = JSON.parse(localStorage.getItem("userDB")) || [];
    const existingUser = userDB.find((user) => user.username === newUser.username);
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }
    userDB.push(newUser);
    localStorage.setItem("userDB", JSON.stringify(userDB));
    return { success: true, message: "Registration successful, please login" }; 
  }
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
