import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/todos/filtersSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
    activeFilter: filtersReducer,
  },
});
