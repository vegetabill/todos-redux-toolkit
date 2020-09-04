import { withDelay } from "./fake-async";
import { createTodo } from "./todos-rest-client";
import { generate as newId } from "shortid";
import { add } from "../features/todos/todosSlice";

const lists = {};

function createList(name) {
  lists[name] = {
    id: newId(),
    name,
    todoIds: [],
  };
}

function fetchList(id) {
  return lists[id];
}

function addToList(listId, todoId) {
  lists[listId].todos.push(todoId);
}

function addNewTodoToList(listId, todo) {
  const savedTodo = await createTodo(todo);
  addToList(listId, savedTodo.id);
}

export default {
  createList: withDelay(createList),
  fetchList: withDelay(fetchList),
  addNewTodoToList: withDelay(addNewTodoToList)
};
