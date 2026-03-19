import React from "react";
import RegistrationForm from "../Feature/Registration/RegistrationForm.tsx";
import Column from "../Components/Ui/Column.tsx";

const Registration = () => {
  return (
    <Column className="flex w-full flex-col">
      <div className="flex-1 flex items-center justify-center pt-20">
        <RegistrationForm />
      </div>
    </Column>
  );
};

export default Registration;
