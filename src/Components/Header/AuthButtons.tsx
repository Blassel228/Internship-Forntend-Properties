import AuthButton from "./AuthButton.tsx";
import Navlink from "../Navlink.tsx";
import React from "react";
import useAuth from "../../Hooks/useAuth.tsx";
import {getItem} from "../../Utils/localStorage.tsx";

const AuthButtons = () => {
  const {logout} = useAuth();
  const token = getItem("token");
  return(
    <>
    {token ? (
        <div className="flex space-x-6">
          <AuthButton
            onClick={logout}
            variant="danger"
            to={"/home"}
          >
            Logout
          </AuthButton>
        </div>
        ) : (
          <>
            <Navlink
              to="/login"
            >
              Login
            </Navlink>
            <Navlink
              to="/register"
              variant="success"
            >
              Register
            </Navlink>
          </>
        )
      }
    </>
  )
}

export default AuthButtons;