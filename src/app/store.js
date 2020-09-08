import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import listsReducer from "../features/lists/listsSlice";
import currentListIdReducer from "../features/activeList/activeListIdSlice";
import filtersReducer from "../features/activeList/filtersSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
    lists: listsReducer,
    activeList: combineReducers({
      activeListId: currentListIdReducer,
      filter: filtersReducer,
    }),
  },
});
