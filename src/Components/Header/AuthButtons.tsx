import Navlink from "../Navlink.tsx";
import React from "react";
import { getItem } from "../../Utils/localStorage.tsx";

const AuthButtons = () => {
  const token = getItem("token");
  return (
    <>
      {!token && (
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
