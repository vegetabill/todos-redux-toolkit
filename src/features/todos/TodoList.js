import React from "react";
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, add, toggleCompletion } from "./todosSlice";

export default function TodoList({ title }) {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  return (
    <>
      <h2>{title || "My TODOS"}</h2>
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
