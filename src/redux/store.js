import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";

export default configureStore({
  reducer: {
    filter,
  },
});
