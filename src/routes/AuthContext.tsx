// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../src/models/Types"; // Đảm bảo rằng User là một interface đã định nghĩa
import { getCurrentLogin } from "../services/authService";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  getUserCurrent: (token: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Kiểm tra token khi app khởi chạy
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const userData = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      getUserCurrent(token)
    }
  }, []);

  // Hàm đăng nhập
  const login = (token: string, userData: User) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };


  // Hàm đăng xuất
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  //Hàm get thông tin hiện tại
  const getUserCurrent = async (token:any) => {
    const res = await getCurrentLogin(token);
    setUser(res);

    console.log(res);
  }
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout,getUserCurrent }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
