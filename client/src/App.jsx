import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, createContext, useContext } from "react";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Register from "./components/Register.jsx";
import Header from "./components/Header.jsx";
import StudentManagement from "./components/StudentManagement.jsx";

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const AppRoutes = () => (
  <>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  </>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToastContainer position="top-center" pauseOnFocusLoss={true} />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
