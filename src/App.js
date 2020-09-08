import React from "react";
import TodoList from "./features/todos/TodoList";
import ListMenu from "./features/activeList/ListMenu";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ListMenu />
      <TodoList />
    </div>
  );
}

export default App;
