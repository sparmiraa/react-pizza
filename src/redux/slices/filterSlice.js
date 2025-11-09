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
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      if (action.payload.search !== undefined) {
        state.search = action.payload.search;
      }
    }
  }
})

export const {setFilters} = filterSlice.actions;
export default filterSlice.reducer