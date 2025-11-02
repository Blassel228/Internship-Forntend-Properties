import React from "react";
import RegistrationForm from "../Feature/Registration/RegistrationForm.tsx";

const Registration = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex-1 flex items-center justify-center pt-20">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Registration;
