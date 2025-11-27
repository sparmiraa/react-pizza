import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORT_OPTIONS } from "../../constants/sortOptions";
import { RootState } from "../store";

interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  search: string;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  search: "",
  sort: {
    name: SORT_OPTIONS[0].name,
    sortProperty: SORT_OPTIONS[0].sortProperty,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      const { sort, currentPage, categoryId, search } = action.payload;
      state.sort = sort;
      state.currentPage = Number(currentPage);
      state.categoryId = Number(categoryId);
      if (search !== undefined) state.search = search;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
