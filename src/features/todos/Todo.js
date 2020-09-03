import React from "react";
import classnames from "classnames";

export default function Todo({ todo, onToggle }) {
  const { text, completed } = todo;
  const cx = classnames("todo", { "todo--completed": completed });
  return (
    <li className={cx}>
      <input
        onChange={onToggle}
        type="checkbox"
        checked={completed}
        name="todoToggle"
      />
      {text}
    </li>
  );
}
