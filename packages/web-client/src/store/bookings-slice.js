import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
  },

  reducers: {
    setBookings(state, action) {
      const { bookings } = action.payload;
      state.bookings = bookings;
    },
    addBooking(state, action) {
      const newBooking = action.payload;
      state.bookings = [...state.bookings, newBooking];
    },
  },
});

export const bookingsActions = bookingsSlice.actions;

export default bookingsSlice;
