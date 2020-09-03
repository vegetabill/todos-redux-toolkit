import React from "react";
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";
import FilterToolbar from "./FilterToolbar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTotalCount,
  selectVisibleTodos,
  add,
  toggleCompletion,
} from "./todosSlice";

export default function TodoList({ title }) {
  const todos = useSelector(selectVisibleTodos);
  const totalCount = useSelector(selectTotalCount);
  const dispatch = useDispatch();
  return (
    <>
      <h2>
        {title || "My TODOS"} ({totalCount})
      </h2>
      <h3>{totalCount - todos.length} currently hidden</h3>
      <FilterToolbar />
      <ul className="todosList">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={() => dispatch(toggleCompletion({ id: todo.id }))}
          />
        ))}
      </ul>
      <AddTodoForm onAdd={({ text }) => dispatch(add({ text }))} />
    </>
  );
}
