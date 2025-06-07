import {Navigate, Route, Routes} from "react-router-dom";
import { JSX } from "react";
import HomePage from "../Pages/Home.tsx";
import RoomPage from "../Pages/RoomPage.tsx";
import RegistrationPage from "../Pages/RegistrationPage.tsx";
import LoginPage from "../Pages/LoginPage.tsx";

export default function Routers(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/room/:id" element={<RoomPage />} />
      <Route path="/register" element={<RegistrationPage />} />;
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
