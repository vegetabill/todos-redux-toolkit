import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import ListApi from "../../api/todo-list-client";

export const addList = createAsyncThunk("lists/addList", ({ name }) =>
  ListApi.createList(name)
);

export const fetchAllLists = createAsyncThunk("lists/fetchAllLists", () =>
  ListApi.fetchAllLists()
);

export const listsSlice = createSlice({
  name: "lists",
  initialState: {},
  reducers: {
    deleteList: (state, action) => {
      const id = action.payload;
      state[id] = undefined;
    },
    updateList: (state, action) => {
      const { id, name } = action.payload;
      state[id].name = name;
    },
  },
  extraReducers: {
    [addList.fulfilled]: (state, action) => {
      const list = action.payload;
      state[list.id] = list;
    },
    [fetchAllLists.fulfilled]: (_, action) => {
      const lists = action.payload;
      return lists.reduce((result, list) => {
        result[list.id] = list;
        return result;
      }, {});
    },
  },
});

export const { deleteList, updateList } = listsSlice.actions;

export const selectListsById = (state) => state.lists;

export const selectAllListIds = createSelector([selectListsById], (listsById) =>
  Object.keys(listsById)
);

export const makeSelectList = (listId) => {
  return createSelector([selectListsById], (listsById) => listsById[listId]);
};

export const selectAllLists = createSelector(
  [selectAllListIds, selectListsById],
  (listIds, listsById) => listIds.map((id) => listsById[id])
);

export default listsSlice.reducer;
