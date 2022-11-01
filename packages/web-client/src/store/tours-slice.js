import { createSlice } from "@reduxjs/toolkit";

const toursSlice = createSlice({
  name: "tours",
  initialState: {
    tours: [],
    search: "",
  },

  reducers: {
    setTours(state, action) {
      const { tours } = action.payload;
      state.tours = tours;
    },
    addTour(state, action) {
      const { newTour } = action.payload;
      state.tours = [...state.tours, newTour];
    },
    removeTour(state, action) {
      const { id } = action.payload;
      state.tours = state.tours.filter((tour) => tour._id !== id);
    },
    replaceTour(state, action) {
      const { newTour } = action.payload;
      const tours = state.tours.filter((tour) => tour._id !== newTour._id);
      state.tours = [...tours, newTour];
    },
    addSearchWord(state, action) {
      const { searchWord } = action.payload;
      state.search = searchWord;
    },
  },
});

export const toursActions = toursSlice.actions;

export default toursSlice;
