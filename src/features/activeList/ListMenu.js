import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllLists } from "../lists/listsSlice";
import { selectActiveListId, updateActiveListId } from "./activeListIdSlice";
import AddListForm from "../lists/AddListForm";

export default function ListMenu() {
  const lists = useSelector(selectAllLists);
  const currentId = useSelector(selectActiveListId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentId && lists) {
      const firstId = lists[0].id;
      dispatch(updateActiveListId(firstId));
    }
  }, [currentId, lists, dispatch]);

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
