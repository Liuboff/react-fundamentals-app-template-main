import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (state, { payload }) => {
      state.push(...payload);
    },
    saveAuthor: (state, { payload }) => {
      state.push(payload);
    },
  },
});

// use these actions in your components / thunks
export const { setAuthors, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
