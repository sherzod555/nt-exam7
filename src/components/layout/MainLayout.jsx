import React, { useContext, useEffect } from "react";
import Sidebar from "../Main/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

export const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isDarkMode } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  return (
    <div className={`flex ${isDarkMode ? "bg-[#1c1c1c]" : "bg-inherit"}`}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
