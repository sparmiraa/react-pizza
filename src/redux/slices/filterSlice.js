import {createSlice} from "@reduxjs/toolkit"
import {SORT_OPTIONS} from "../../constants/sortOptions";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  search: "",
  sort: {
    name: SORT_OPTIONS[0].name,
    sortProperty: SORT_OPTIONS[0].sortProperty,
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action) {
      const { sort, currentPage, categoryId, search } = action.payload;
      state.sort = sort;
      state.currentPage = Number(currentPage);
      state.categoryId = Number(categoryId);
      if (search !== undefined) state.search = search;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  }
})

export const {setFilters, setSearch} = filterSlice.actions;
export default filterSlice.reducer