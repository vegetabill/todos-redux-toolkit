import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import TodosApi from "../../api/todos-rest-client";

export const createTodo = createAsyncThunk("todos/createTodo", (todo) =>
  TodosApi.createTodo(todo)
);

export const updateTodo = createAsyncThunk("todos/updateTodo", (todo) =>
  TodosApi.updateTodo(todo)
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {},
  extraReducers: {
    [createTodo.fulfilled]: (state, action) => {
      const todo = action.payload;
      state[todo.id] = todo;
    },
    [updateTodo.fulfilled]: (state, action) => {
      const todo = action.payload;
      state[todo.id] = todo;
    },
  },
});

export const toggleCompletion = (todo) => {
  return (dispatch) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    dispatch(updateTodo(updatedTodo));
  };
};

export const selectTodosById = (state) => state.todos;

export const selectAllTodos = createSelector([selectTodosById], (todosById) =>
  Object.values(todosById)
);

export const makeSelectTodos = (...ids) => {
  return createSelector([selectTodosById], (byId) => ids.map((id) => byId[id]));
};

export default todosSlice.reducer;
