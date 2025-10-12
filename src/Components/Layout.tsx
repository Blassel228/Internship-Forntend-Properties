import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Components/Header/Header.tsx";
import Footer from "../Components/Footer/Footer.tsx";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
