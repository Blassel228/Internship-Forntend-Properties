import React from "react";
import RegistrationForm from "../Components/RegistrationForm.tsx";
import Header from "../Components/Header.tsx";

const RegistrationPage = () => {
  return (
    <div className="flex items-center justify-center w-full flex-col">
      <Header />
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
