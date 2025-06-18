import {Navigate, Route, Routes} from "react-router-dom";
import { JSX } from "react";
import HomePage from "../Pages/Home.tsx";
import RoomPage from "../Pages/RoomPage.tsx";
import RegistrationPage from "../Pages/RegistrationPage.tsx";
import LoginPage from "../Pages/LoginPage.tsx";
import RoomsPage from "../Pages/RoomsPage.tsx";
import routers from "../Constants/routers.tsx";
import BookPage from "../Pages/BookPage.tsx";

export default function Routers(): JSX.Element {
  return (
    <Routes>
      <Route path={routers.home} element={<HomePage />} />
      <Route path={`${routers.room}/:id`} element={<RoomPage />} />
      <Route path={routers.register} element={<RegistrationPage />} />;
      <Route path={routers.login} element={<LoginPage />} />
      <Route path={routers.rooms} element={<RoomsPage />} />
      <Route path={`${routers.book}/:id`} element={<BookPage />} />
      <Route path={routers.notExisting} element={<Navigate to={routers.home} replace />} />
    </Routes>
  );
}
