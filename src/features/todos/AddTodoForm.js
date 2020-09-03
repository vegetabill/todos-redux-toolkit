import React, { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ text });
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        required={true}
        placeholder="walk the dog"
        value={text}
        onChange={(e) => setText(e.target.value)}
        name="todoText"
      />
      <input type="submit" value="Add" />
    </form>
  );
}
