import { createSlice, createSelector } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const buildNew = ({ text, listId }) => {
  return { id: nanoid(), text, completed: false, listId };
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: {},
  reducers: {
    createTodo: (state, action) => {
      const {
        payload: { text, listId },
      } = action;
      const todo = buildNew({ text, listId });
      state[todo.id] = todo;
    },
    toggleCompletion: (state, { payload: { id } }) => {
      const todo = state[id];
      todo.completed = !todo.completed;
    },
  },
});

export const { createTodo, toggleCompletion } = todosSlice.actions;

export const selectTodosById = (state) => state.todos;

export const selectAllTodos = createSelector([selectTodosById], (todosById) =>
  Object.values(todosById)
);

export const makeSelectTodos = (...ids) => {
  return createSelector([selectTodosById], (byId) => ids.map((id) => byId[id]));
};

export default todosSlice.reducer;
