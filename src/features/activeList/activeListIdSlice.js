import { createSlice } from "@reduxjs/toolkit";

export const activeListIdSlice = createSlice({
  name: "activeListId",
  initialState: null,
  reducers: {
    updateActiveListId: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    "lists/addList/fulfilled": (_, action) => {
      const list = action.payload;
      return list.id;
    },
  },
});

export const { updateActiveListId } = activeListIdSlice.actions;

export const selectActiveListId = (state) => state.activeList.activeListId;

export default activeListIdSlice.reducer;
