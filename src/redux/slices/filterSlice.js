import { createSlice } from "@reduxjs/toolkit"
import { SORT_OPTIONS } from "../../constants/sortOptions";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: SORT_OPTIONS[0].name,
        sortProperty: SORT_OPTIONS[0].sortProperty,
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        }
    }
})

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer