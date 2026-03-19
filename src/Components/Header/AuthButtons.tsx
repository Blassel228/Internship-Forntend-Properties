import Navlink from "../Ui/Navlink.tsx";
import React from "react";
import { getItem } from "../../Utils/localStorage.tsx";
import useAuth from "../../Hooks/useAuth.tsx";

const AuthButtons = () => {
  const {isAuthenticated} = useAuth();
  return (
    <>
      {!isAuthenticated() && (
        <>
          <Navlink to="/login">Login</Navlink>
          <Navlink to="/register" variant="success">
            Register
          </Navlink>
        </>
      )}
    </>
  );
};

export default AuthButtons;
