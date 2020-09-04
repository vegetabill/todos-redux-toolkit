import { createSlice, createSelector } from "@reduxjs/toolkit";
import { selectCurrentListId } from "./currentListIdSlice";
import { generate as newId } from "shortid";

const createList = (name) => {
  return {
    id: newId(),
    name,
    todoIds: [1],
  };
};

const initialList = createList("My TODOS");

export const listsSlice = createSlice({
  name: "lists",
  initialState: {
    [initialList.id]: initialList,
  },
  reducers: {
    add: (state, action) => {
      const { name } = action.payload;
      const list = createList(name);
      state[list.id] = list;
    },
    remove: (state, action) => {
      const id = action.payload;
      state[id] = undefined;
    },
    update: (state, action) => {
      const { id, name } = action.payload;
      state[id].name = name;
    },
  },
});

export const { add, remove, update } = listsSlice.actions;

export const selectListsById = (state) => state.lists;

export const selectCurrentList = createSelector(
  [selectListsById, selectCurrentListId],
  (byId, currentId) => byId[currentId]
);

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
