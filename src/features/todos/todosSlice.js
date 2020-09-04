import { createSlice, createSelector } from "@reduxjs/toolkit";
import { generate as newId } from "shortid";
import { FilterFunctions, selectActiveFilter } from "./filtersSlice";
import { selectCurrentList } from "../lists/listsSlice";

const createTodo = ({ text }) => {
  return { id: newId(), text, completed: false };
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    1: {
      id: 1,
      text: "Brush a dangerous pom",
      completed: false,
    },
  },
  reducers: {
    add: (state, action) => {
      const {
        payload: { text },
      } = action;
      const todo = createTodo({ text });
      state[todo.id] = todo;
    },
    toggleCompletion: (state, { payload: { id } }) => {
      const todo = state[id];
      todo.completed = !todo.completed;
    },
  },
});

export const { add, toggleCompletion } = todosSlice.actions;

export const selectTodosById = (state) => state.todos;

export const makeSelectTodos = (...ids) => {
  return createSelector([selectTodosById], (byId) => ids.map((id) => byId[id]));
};

export const selectTodosOnCurrentList = createSelector(
  [selectCurrentList, selectTodosById],
  (list, todosById) => {
    if (!list) {
      return [];
    }
    return list.todoIds.map((id) => todosById[id]);
  }
);

export const selectTotalCount = createSelector(
  [selectTodosOnCurrentList],
  (todos) => todos.length
);

export const selectVisibleTodos = createSelector(
  [selectTodosOnCurrentList, selectActiveFilter],
  (todos, activeFilter) => {
    return todos.filter(FilterFunctions[activeFilter]);
  }
);

export default todosSlice.reducer;
