import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import bookingsSlice from "./bookings-slice";
import toursSlice from "./tours-slice";
import usersSlice from "./users-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tours: toursSlice.reducer,
    users: usersSlice.reducer,
    bookings: bookingsSlice.reducer,
  },
});

export default store;
