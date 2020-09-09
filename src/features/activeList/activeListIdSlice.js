import { createSlice } from "@reduxjs/toolkit";
import { addList, fetchAllLists } from "../lists/listsSlice";

export const activeListIdSlice = createSlice({
  name: "activeListId",
  initialState: null,
  reducers: {
    updateActiveListId: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [addList.fulfilled]: (_, action) => {
      const list = action.payload;
      return list.id;
    },
    [fetchAllLists.fulfilled]: (currentId, action) => {
      if (!currentId) {
        const allLists = action.payload;
        const firstList = allLists[0];
        if (firstList) {
          return firstList.id;
        }
      }
      return currentId;
    },
  },
});

export const { updateActiveListId } = activeListIdSlice.actions;

export const selectActiveListId = (state) => state.activeList.activeListId;

export default activeListIdSlice.reducer;
