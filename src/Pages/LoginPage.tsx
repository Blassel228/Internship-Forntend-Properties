import React from "react";
import LoginForm from "../Components/LoginForm.tsx";
import Header from "../Components/Header.tsx";

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;