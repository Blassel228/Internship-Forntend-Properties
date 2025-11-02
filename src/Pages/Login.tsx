import React from "react";
import LoginForm from "../Feature/Login/LoginForm.tsx";

const Login = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
