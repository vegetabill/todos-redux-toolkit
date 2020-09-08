import { selectActiveListId } from "./activeListIdSlice";
import { selectListsById } from "../lists/listsSlice";
import { FilterFunctions, selectFilter } from "./filtersSlice";
import { selectAllTodos } from "../todos/todosSlice";
import { createSelector } from "@reduxjs/toolkit";

export const selectActiveList = createSelector(
  [selectListsById, selectActiveListId],
  (byId, currentId) => byId[currentId]
);

export const selectTodosByListId = createSelector([selectAllTodos], (todos) => {
  return todos.reduce((mapping, todo) => {
    const { listId } = todo;
    if (!mapping[listId]) {
      mapping[listId] = [todo];
    } else {
      mapping[listId].push(todo);
    }
    return mapping;
  }, {});
});

export const selectTodosOnCurrentList = createSelector(
  [selectActiveList, selectTodosByListId],
  (list, todosByListId) => {
    if (!list) {
      return [];
    }
    return todosByListId[list.id] || [];
  }
);

export const selectTotalCount = createSelector(
  [selectTodosOnCurrentList],
  (todos) => todos.length
);

export const selectVisibleTodos = createSelector(
  [selectTodosOnCurrentList, selectFilter],
  (todos, activeFilter) => {
    return todos.filter(FilterFunctions[activeFilter]);
  }
);
