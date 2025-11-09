import {configureStore} from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    filter,
  },
});

window.store = store;
export default store;