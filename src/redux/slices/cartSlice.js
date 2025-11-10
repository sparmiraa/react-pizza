import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },

    addItemCountById(state, action) {
      const item = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (!item) return;
      item.count++;
      state.totalPrice += item.price;
    },

    minusItemCountById(state, action) {
      const item = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (!item || item.count <= 1) return;
      item.count--;
      state.totalPrice -= item.price;
    },

    removeItemById(state, action) {
      state.items = state.items.filter(
        (obj) =>
          !(
            obj.id === action.payload.id &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size
          )
      );
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  addItemCountById,
  minusItemCountById,
  removeItemById,
  clearItems,
} = cartSlice.actions;
export default cartSlice.reducer;
