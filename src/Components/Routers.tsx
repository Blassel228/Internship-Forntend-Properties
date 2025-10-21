import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout.tsx";
import HomePage from "../Pages/Home.tsx";
import Room from "../Pages/Room.tsx";
import Registration from "../Pages/Registration.tsx";
import Login from "../Pages/Login.tsx";
import Rooms from "../Pages/Rooms.tsx";
import Booking from "../Pages/Booking.tsx";
import PersonalData from "../Pages/PersonalData.tsx";
import MyBookings from "../Pages/MyBookings.tsx";
import BookingDetails from "../Pages/BookingDetails.tsx";
import CancelBooking from "../Pages/CancelBooking.tsx";
import AdminRooms from "../Pages/AdminRooms.tsx";
import MyReviews from "../Pages/MyReviews.tsx";
import MakeReview from "../Pages/MakeReview.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AdminRoute from "./AdminRoute.tsx";

import routers from "../Constants/routers.tsx";

export default function Routers() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route index element={<HomePage />} />
        <Route path={routers.home} element={<HomePage />} />
        <Route path={`${routers.room}/:id`} element={<Room />} />
        <Route path={routers.rooms} element={<Rooms />} />
        <Route path={routers.register} element={<Registration />} />
        <Route path={routers.login} element={<Login />} />
        <Route path={`${routers.book}/:id`} element={<Booking />} />

        <Route element={<ProtectedRoute />}>
          <Route path={routers.personalData} element={<PersonalData />} />
          <Route path={routers.myBookings} element={<MyBookings />} />
          <Route path={routers.bookingDetails} element={<BookingDetails />} />
          <Route path={routers.cancelBooking} element={<CancelBooking />} />
          <Route path={routers.reviews} element={<MyReviews />} />
          <Route path={routers.makeReview} element={<MakeReview />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path={routers.adminRooms} element={<AdminRooms />} />
        </Route>

        <Route
          path={routers.notExisting}
          element={<Navigate to={routers.home} replace />}
        />
      </Route>
    </Routes>
  );
}