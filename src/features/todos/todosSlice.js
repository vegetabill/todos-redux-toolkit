import { createSlice } from "@reduxjs/toolkit";
import { generate as newId } from "shortid";

const createTodo = ({ text }) => {
  return { id: newId(), text, completed: false };
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: [
    createTodo({ text: "feed simi" }),
    createTodo({ text: "bathe simi" }),
  ],
  reducers: {
    add: (state, action) => {
      const {
        payload: { text },
      } = action;
      state.push(createTodo({ text }));
    },
    toggleCompletion: (state, { payload: { id } }) => {
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { add, toggleCompletion } = todosSlice.actions;

export const selectTodos = (state) => state.todos;

export default todosSlice.reducer;
