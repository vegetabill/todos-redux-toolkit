import { createSlice } from "@reduxjs/toolkit";

export const currentListIdSlice = createSlice({
  name: "currentListId",
  initialState: null,
  reducers: {
    updateCurrentListId: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateCurrentListId } = currentListIdSlice.actions;

export const selectCurrentListId = (state) => state.currentListId;

export default currentListIdSlice.reducer;
