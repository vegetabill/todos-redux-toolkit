import React from "react";
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";
import FilterToolbar from "../activeList/FilterToolbar";
import { useSelector, useDispatch } from "react-redux";
import { createTodo, toggleCompletion } from "./todosSlice";
import {
  selectActiveList,
  selectTotalCount,
  selectVisibleTodos,
} from "../activeList/activeListSelectors";
import EditableListTitle from "../activeList/EditableListTitle";

export default function TodoList() {
  const list = useSelector(selectActiveList);
  const todos = useSelector(selectVisibleTodos);
  const totalCount = useSelector(selectTotalCount);
  const dispatch = useDispatch();
  if (!list) {
    return "Loading...";
  }
  return (
    <>
      <h2>
        <EditableListTitle list={list} /> ({totalCount})
      </h2>
      <h3>{totalCount - todos.length} currently hidden</h3>
      <FilterToolbar />
      <ul className="todosList">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={() => dispatch(toggleCompletion(todo))}
          />
        ))}
      </ul>
      <AddTodoForm
        onAdd={({ text }) => dispatch(createTodo({ text, listId: list.id }))}
      />
    </>
  );
}
