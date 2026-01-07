import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import user from "./user/userSlice";

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
