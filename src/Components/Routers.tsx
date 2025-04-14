import { Route, Routes } from "react-router-dom";
import { JSX } from "react";
import HomePage from "../Pages/Home.tsx";
import { property } from "../Constants/roomsMockData.tsx";
import PropertyPage from "../Pages/PropertyPage.tsx";
import PropertyPage1 from "../Pages/PropertyPage1.tsx";
import RegistrationForm from "./RegistrationForm.tsx";
import RegistrationPage from "../Pages/RegistrationPage.tsx";
import LoginPage from "../Pages/LoginPage.tsx";

export default function Routers(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/property/:id" element={<PropertyPage />} />
      <Route
        path="/property1"
        element={<PropertyPage1 property={property} />}
      />
      <Route path="/register" element={<RegistrationPage />} />;
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
