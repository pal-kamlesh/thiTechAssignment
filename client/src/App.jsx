import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Register from "./components/Register.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import StudentManagement from "./components/StudentManagement.jsx";

const AppRoutes = () => (
  <>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  </>
);

const App = () => (
  <BrowserRouter>
    <ToastContainer position="top-center" pauseOnFocusLoss={true} />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
