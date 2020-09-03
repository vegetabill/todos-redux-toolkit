import { createSlice } from "@reduxjs/toolkit";

export const FilterTypes = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_UNCOMPLETED: "SHOW_UNCOMPLETED",
};

export const FilterLabels = {
  SHOW_ALL: "Show all",
  SHOW_COMPLETED: "Show completed",
  SHOW_UNCOMPLETED: "Show uncompleted",
};

export const FilterFunctions = {
  SHOW_ALL: () => true,
  SHOW_COMPLETED: (todo) => !!todo.completed,
  SHOW_UNCOMPLETED: (todo) => !todo.completed,
};

export const filtersSlice = createSlice({
  name: "activeFilter",
  initialState: FilterTypes.SHOW_ALL,
  reducers: {
    updateFilter(_, action) {
      return action.payload;
    },
  },
});

export const { updateFilter } = filtersSlice.actions;

export const selectActiveFilter = ({ activeFilter }) => activeFilter;

export default filtersSlice.reducer;
