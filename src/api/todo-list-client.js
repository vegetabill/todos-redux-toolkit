import { withDelay } from "./fake-async";
import { nanoid } from "@reduxjs/toolkit";

const lists = {};

function createList(name) {
  lists[name] = {
    id: nanoid(),
    name,
  };
  return lists[name];
}

//seed data
createList("My TODOs");

function fetchList(id) {
  return lists[id];
}

function fetchAllLists() {
  return Object.values(lists);
}

export default {
  createList: withDelay(createList),
  fetchList: withDelay(fetchList),
  fetchAllLists: withDelay(fetchAllLists),
};
