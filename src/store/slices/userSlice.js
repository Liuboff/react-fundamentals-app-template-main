import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token") || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.isAuth = true;
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
    },
    removeUserData: (state) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
