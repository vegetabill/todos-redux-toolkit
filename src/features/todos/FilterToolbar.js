import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterLabels, updateFilter, selectActiveFilter } from "./filtersSlice";

export default function FilterToolbar() {
  const dispatch = useDispatch();
  const activeFilter = useSelector(selectActiveFilter);
  return (
    <form className="filtersForm">
      <select
        onChange={(e) => dispatch(updateFilter(e.target.value))}
        value={activeFilter}
      >
        {Object.entries(FilterLabels).map(([filterId, filterLabel]) => (
          <option key={filterId} value={filterId}>
            {filterLabel}
          </option>
        ))}
      </select>
    </form>
  );
}
