import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "./listsSlice";

export default function AddListForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addList({ name }));
    setName("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="listName"
        required={true}
        placeholder="Costco List"
      />
      <input type="submit" value="Create List" />
    </form>
  );
}
