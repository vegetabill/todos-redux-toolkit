import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllLists, fetchAllLists } from "../lists/listsSlice";
import { selectActiveListId, updateActiveListId } from "./activeListIdSlice";
import AddListForm from "../lists/AddListForm";

export default function ListMenu() {
  const lists = useSelector(selectAllLists);
  const currentId = useSelector(selectActiveListId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lists.length === 0) {
      dispatch(fetchAllLists());
    }
  }, [lists, dispatch]);

  return (
    <div className="listsMenu">
      <form>
        <h3>Lists</h3>

        {lists.map((list) => (
          <label key={list.id}>
            <input
              onChange={(e) => dispatch(updateActiveListId(list.id))}
              type="radio"
              name="activeList"
              value={list.id}
              checked={currentId === list.id}
            />
            {list.name}
          </label>
        ))}
      </form>
      <AddListForm />
    </div>
  );
}
