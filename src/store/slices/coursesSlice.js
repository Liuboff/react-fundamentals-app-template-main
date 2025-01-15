import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      // state = payload; //was here
      state.push(...payload);
    },
    saveCourse: (state, { payload }) => {
      state.push(payload);
    },
    deleteCourse: (state, { payload }) => {
      return state.filter((course) => course.id !== payload);
    },
    updateCourse: (state, { payload }) => {
      const courseIndex = state.findIndex((course) => course.id === payload.id);
      if (courseIndex !== -1) {
        state[courseIndex] = { ...state[courseIndex], ...payload };
      }
    },
  },
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
