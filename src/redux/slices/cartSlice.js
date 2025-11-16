import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CART_API = "https://690399efd0f10a340b250ab6.mockapi.io/cart";

const isEqualItem = (a, b) => a.id === b.id && a.type === b.type && a.size === b.size;


export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get(CART_API);
  return data.map((item) => ({
    mockapiId: item.id,
    id: item.originalId,
    title: item.title,
    price: item.price,
    type: item.type,
    size: item.size,
    count: item.count,
    imageUrl: item.imageUrl,
  }));
});

export const addItemCart = createAsyncThunk("cart/addItemCart", async (item) => {
  const { data } = await axios.post(CART_API, { ...item, originalId: item.id });
  return data;
});

export const updateItemCart = createAsyncThunk(
  "cart/updateItemCart",
  async ({ id, updates }) => {
    const { data } = await axios.put(`${CART_API}/${id}`, updates);
    return data;
  }
);

export const removeItemCart = createAsyncThunk("cart/removeItemCart", async (id) => {
  await axios.delete(`${CART_API}/${id}`);
  return id;
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  const state = thunkAPI.getState().cart.items;
  const idsToDelete = state.filter(item => item.mockapiId).map(item => item.mockapiId);
  await Promise.all(idsToDelete.map(id => axios.delete(`${CART_API}/${id}`)));
  return idsToDelete;
});



const initialState = {
  items: [],
  totalPrice: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const findItem = state.items.find((i) => isEqualItem(i, item));
    
      if (findItem) {
        findItem.count = item.count;
      } else {
        state.items.push({ ...item });
      }
    
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.count, 0);
    }
    ,

    addItemCountById(state, action) {
      const item = state.items.find((i) => isEqualItem(i, action.payload));
      if (!item || item.count >= 9) return;
      item.count++;
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.count, 0);
    },

    minusItemCountById(state, action) {
      const item = state.items.find((i) => isEqualItem(i, action.payload));
      if (!item || item.count <= 1) return;
      item.count--;
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.count, 0);
    },

    removeItemById(state, action) {
      state.items = state.items.filter((i) => !isEqualItem(i, action.payload));
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.count, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.count, 0);
      })
      .addCase(addItemCart.fulfilled, (state, action) => {
        const saved = action.payload;
        const item = state.items.find((i) => isEqualItem(i, saved));
        if (item) item.mockapiId = saved.id;
      })
      .addCase(updateItemCart.fulfilled, (state, action) => {
        const updated = action.payload;
        const item = state.items.find((i) => i.mockapiId === updated.id);
        if (item) item.count = updated.count;
        state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.count, 0);
      })
      .addCase(removeItemCart.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.mockapiId !== action.payload);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.count, 0);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalPrice = 0;
      });
  },
});

export const { addItem, addItemCountById, minusItemCountById, removeItemById, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
