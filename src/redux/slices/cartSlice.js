import { createSlice } from "@reduxjs/toolkit";

const isEqualItem = (a, b) => {
  return (
  a.id === b.id &&
  a.type === b.type &&
  a.size === b.size )
}

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => isEqualItem(item, action.payload));

      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      } else {
        state.items.push({ ...action.payload, count: 1 });
        state.totalPrice += action.payload.price;
      }
    },

    addItemCountById(state, action) {
      const item = state.items.find((item) => isEqualItem(item, action.payload));
      if (!item || item.count >= 9) return;
      item.count++;
      state.totalPrice += item.price;
    },

    minusItemCountById(state, action) {
      const item = state.items.find((item) => isEqualItem(item, action.payload));
      if (!item || item.count <= 1) return;
      item.count--;
      state.totalPrice -= item.price;
    },

    removeItemById(state, action) {
      const item = state.items.find((item) => isEqualItem(item, action.payload));
      if (!item) return;


      state.totalPrice -= item.price * item.count;
      state.items = state.items.filter((i) => !isEqualItem(i, action.payload));
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
