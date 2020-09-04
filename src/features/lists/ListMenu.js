import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllLists } from "./listsSlice";
import { selectCurrentListId, updateCurrentListId } from "./currentListIdSlice";
import AddListForm from "./AddListForm";

export default function ListMenu() {
  const lists = useSelector(selectAllLists);
  const currentId = useSelector(selectCurrentListId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentId && lists) {
      const firstId = lists[0].id;
      dispatch(updateCurrentListId(firstId));
    }
  }, [currentId, lists, dispatch]);

  return (
    <div className="listsMenu">
      <form>
        <h3>Lists</h3>

        {lists.map((list) => (
          <label key={list.id}>
            <input
              onChange={(e) => dispatch(updateCurrentListId(list.id))}
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
