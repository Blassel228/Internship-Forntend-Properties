import React from "react";
import RegistrationForm from "../Components/RegistrationForm.tsx";
import Header from "../Components/Header/Header.tsx";

const RegistrationPage = () => {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center pt-20">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
