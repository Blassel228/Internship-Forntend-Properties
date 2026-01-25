const routers = {
  home: "/home",
  room: "/room",
  register: "/register",
  login: "/login",
  rooms: "/rooms",
  book: "/makeBooking",

  mySettings: "/mysettings",
  personalData: "/mysettings/personaldata",
  myBookings: "/mysettings/mybookings",
  bookingDetails: "/mysetings/mybookings/bookingdetails",
  cancelBooking: "/mysetings/mybookings/bookingdetails/cancelBooking",

  reviews: "/reviews",
  makeReview: "/reviews/makereview",

  adminBookings: "/admin/bookings",
  adminUsers: "/admin/users",
  adminRooms: "/admin/rooms",

  verifyEmail: "/verify-email",
  verifyEmailTest: "/verify-email-test",
  verifyInstruction: "/verify-instruction",
  verifyEmailChange: "/verify-email-change",

  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  notExisting: "*",
};

export default routers;
