import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const createList = (name) => {
  return {
    id: nanoid(),
    name,
  };
};

const initialList = createList("My TODOS");

export const listsSlice = createSlice({
  name: "lists",
  initialState: {
    [initialList.id]: initialList,
  },
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
    "lists/addList/fulfilled": (state, action) => {
      const list = action.payload;
      state[list.id] = list;
    },
  },
});

export const { deleteList, updateList } = listsSlice.actions;

export const addList = createAsyncThunk("lists/addList", ({ name }) => {
  const list = createList(name);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list);
    }, 100);
  });
});

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
