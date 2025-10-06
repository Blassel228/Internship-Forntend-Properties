import {Navigate, Route, Routes} from "react-router-dom";
import {JSX} from "react";
import HomePage from "../Pages/Home.tsx";
import Room from "../Pages/Room.tsx";
import Registration from "../Pages/Registration.tsx";
import Login from "../Pages/Login.tsx";
import Rooms from "../Pages/Rooms.tsx";
import routers from "../Constants/routers.tsx";
import Booking from "../Pages/Booking.tsx";
import PersonalData from "../Pages/PersonalData.tsx";
import UserBookingsPage from "../Pages/BookedRooms.tsx";
import BookingDetails from "../Pages/BookingDetails.tsx";
import CancelBooking from "../Pages/CancelBooking.tsx";
import AdminRooms from "../Pages/AdminRooms.tsx";
import MyReviews from "../Pages/MyReviews.tsx";
import MakeReview from "../Pages/MakeReview.tsx";

export default function Routers(): JSX.Element {
  return (
    <Routes>
        <Route path={routers.home} element={<HomePage />} />
        <Route path={`${routers.room}/:id`} element={<Room />} />
        <Route path={routers.register} element={<Registration />} />;
        <Route path={routers.login} element={<Login />} />
        <Route path={routers.rooms} element={<Rooms />} />
        <Route path={`${routers.book}/:id`} element={<Booking />} />
        <Route path={routers.personalData} element={<PersonalData />} />
        <Route path={routers.myBookings} element={<UserBookingsPage />} />
        <Route path={routers.bookingDetails} element={<BookingDetails />} />
        <Route path={routers.cancelBooking} element={<CancelBooking />} />
        <Route path={routers.adminRooms} element={<AdminRooms />} />
        <Route path={routers.reviews} element={<MyReviews />} />
        <Route path={routers.makeReview} element={<MakeReview />} />
    <Route
    path={routers.notExisting}
    element={<Navigate to={routers.home} replace />}
    />
    </Routes>
  );
}
