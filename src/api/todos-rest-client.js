/**
 * Fake REST API to simulate async / lazy load
 */
import { withDelay } from "./fake-async";

const todos = {};

function validate(todo) {
  if (!todo.id || !todo.text) {
    throw new Error(`HTTP 400 - invalid todo record: ${JSON.stringify(todo)}`);
  }
  return true;
}

function findTodo(id) {
  return todos[id];
}

function storeTodo(todo) {
  console.debug(
    `updating todo: ${JSON.stringify(existing)} => ${JSON.stringify(todo)}`
  );
  todos[todo.id] = todo;
}

function fetchTodo(id) {
  const existing = findTodo(id);
  if (!existing) {
    throw new Error(`[fetchTodo] HTTP 404 - Could not find TODO with id=${id}`);
  }
  return existing;
}

function createTodo(todo) {
  const existing = findTodo(id);
  if (existing) {
    throw new Error(
      `[createTodo] HTTP 409 - TODO with id=${id} already exists`
    );
  }
  storeTodo(todo);
}

function updateTodo(todo) {
  validate(todo);
  const existing = findTodo(id);
  if (!existing) {
    throw new Error(
      `[updateTodo] HTTP 404 - Could not find TODO with id=${id}`
    );
  }
  storeTodo(todo);
}

function deleteTodo(id) {
  const existing = findTodo(id);
  if (!existing) {
    throw new Error(`[fetchTodo] HTTP 404 - Could not find TODO with id=${id}`);
  }
  console.debug(`deleted todo ${JSON.stringify(existing)}`);
  todos[id] = undefined;
}

export default {
  fetchTodo: withDelay(fetchTodo),
  createTodo: withDelay(createTodo),
  updateTodo: withDelay(updateTodo),
  deleteTodo: withDelay(deleteTodo),
};
