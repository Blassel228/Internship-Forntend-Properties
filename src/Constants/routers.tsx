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

  adminBookings: "/adminbookings",
  adminUsers: "/adminusers",
  adminRooms: "/adminrooms",

  verifyEmail: "/verify-email",
  verifyEmailTest: "/verify-email-test",
  verifyInstruction: "/verify-instruction",

  notExisting: "*",
};

export default routers;
