import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/todos/filtersSlice";
import listsReducer from "../features/lists/listsSlice";
import currentListIdReducer from "../features/lists/currentListIdSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
    activeFilter: filtersReducer,
    lists: listsReducer,
    currentListId: currentListIdReducer,
  },
});
