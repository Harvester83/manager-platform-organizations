import React from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import cl from "classnames";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <div className="wrapper">
      <Header />
      <main
        className={cl("main", {
          main_center: currentLocation === "/" || currentLocation === "/signup",
        })}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
