/**
 * Fake REST API to simulate async / lazy load
 */
import { withDelay } from "./fake-async";
import { nanoid } from "@reduxjs/toolkit";

const todos = {};

function validate(todo) {
  if (!todo || !todo.id || !todo.text || !todo.listId) {
    throw new Error(
      `HTTP 400 - invalid todo record: '${JSON.stringify(todo)}'`
    );
  }
  return true;
}

function findTodo(id) {
  return todos[id];
}

function storeTodo(todo) {
  validate(todo);
  todos[todo.id] = todo;
  return todo;
}

function fetchTodo(id) {
  const existing = findTodo(id);
  if (!existing) {
    throw new Error(`[fetchTodo] HTTP 404 - Could not find TODO with id=${id}`);
  }
  return existing;
}

function createTodo(todo) {
  const existing = findTodo(todo.id);
  if (existing) {
    throw new Error(
      `[createTodo] HTTP 409 - TODO with id=${todo.id} already exists`
    );
  }
  return storeTodo({ ...todo, id: nanoid(), completed: false });
}

function updateTodo(todo) {
  validate(todo);
  const existing = findTodo(todo.id);
  console.debug(
    `updating todo: ${JSON.stringify(existing)} => ${JSON.stringify(todo)}`
  );
  if (!existing) {
    throw new Error(
      `[updateTodo] HTTP 404 - Could not find TODO with id=${todo.id}`
    );
  }
  return storeTodo({ ...existing, ...todo });
}

function deleteTodo(id) {
  const existing = findTodo(id);
  if (!existing) {
    throw new Error(`[fetchTodo] HTTP 404 - Could not find TODO with id=${id}`);
  }
  console.debug(`deleted todo ${JSON.stringify(existing)}`);
  todos[id] = undefined;
}

function fetchTodos({ listId }) {
  if (!listId) {
    throw new Error(`[fetchTodos] HTTP 400 - listId is required`);
  }
  return Object.values(todos).filter((todo) => todo.listId === listId);
}

export default {
  fetchTodo: withDelay(fetchTodo),
  fetchTodos: withDelay(fetchTodos),
  createTodo: withDelay(createTodo),
  updateTodo: withDelay(updateTodo),
  deleteTodo: withDelay(deleteTodo),
};
