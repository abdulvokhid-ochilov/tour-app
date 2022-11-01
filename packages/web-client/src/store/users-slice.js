import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },

  reducers: {
    setUsers(state, action) {
      const { users } = action.payload;
      state.users = users;
    },
    removeUsers(state, action) {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user._id !== id);
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
