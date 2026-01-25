import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Ui/Layout.tsx";
import HomePage from "../../Pages/Home.tsx";
import Room from "../../Pages/Room.tsx";
import Registration from "../../Pages/Registration.tsx";
import Login from "../../Pages/Login.tsx";
import Rooms from "../../Pages/Rooms.tsx";
import Booking from "../../Pages/Booking.tsx";
import PersonalData from "../../Pages/PersonalData.tsx";
import MyBookings from "../../Pages/MyBookings.tsx";
import BookingDetails from "../../Pages/BookingDetails.tsx";
import CancelBooking from "../../Pages/CancelBooking.tsx";
import AdminRooms from "../../Pages/AdminRooms.tsx";
import MyReviews from "../../Pages/MyReviews.tsx";
import MakeReview from "../../Pages/MakeReview.tsx";
import AdminUsers from "../../Pages/AdminUsers.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AdminRoute from "./AdminRoute.tsx";
import NonAdminRoute from "./NoneAdminRoutes.tsx";

import routers from "../../Constants/routers.tsx";
import AdminBookings from "../../Pages/AdminBooking.tsx";
import VerifyEmailInstructionPage from "../../Pages/VerificationInstruction.tsx";
import VerificationConfirmationPage from "../../Pages/VerificationConfirmation.tsx";
import VerifyEmailChangePage from "../../Pages/VerifyEmailChange.tsx";
import ForgotPassword from "../../Pages/ForgotPassword.tsx";
import ResetPassword from "../../Pages/ResetPassword.tsx";

export default function Routers() {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route path={routers.adminRooms} element={<AdminRooms />} />
        <Route path={routers.adminUsers} element={<AdminUsers />} />
        <Route path={routers.adminBookings} element={<AdminBookings />} />
      </Route>

      <Route element={<NonAdminRoute />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={routers.home} element={<HomePage />} />
          <Route path={`${routers.room}/:id`} element={<Room />} />
          <Route path={routers.rooms} element={<Rooms />} />
          <Route path={routers.register} element={<Registration />} />
          <Route path={routers.login} element={<Login />} />
          <Route path={`${routers.book}/:id`} element={<Booking />} />
          <Route path={routers.verifyEmail} element={<VerificationConfirmationPage />} />
          <Route path={routers.verifyInstruction} element={<VerifyEmailInstructionPage />} />
          <Route path={routers.verifyEmailChange} element={<VerifyEmailChangePage />}/>
          <Route path={routers.forgotPassword} element={<ForgotPassword />} />
          <Route path={routers.resetPassword} element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path={routers.personalData} element={<PersonalData />} />
            <Route path={routers.myBookings} element={<MyBookings />} />
            <Route path={routers.bookingDetails} element={<BookingDetails />} />
            <Route path={routers.cancelBooking} element={<CancelBooking />} />
            <Route path={routers.reviews} element={<MyReviews />} />
            <Route path={routers.makeReview} element={<MakeReview />} />
          </Route>
        </Route>
      </Route>

      <Route
        path={routers.notExisting}
        element={<Navigate to={routers.home} replace />}
      />
    </Routes>
  );
}