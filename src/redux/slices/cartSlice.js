import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CART_API = "https://690399efd0f10a340b250ab6.mockapi.io/cart";

const calcTotal = (items) =>
  items.reduce((sum, i) => sum + i.price * i.count, 0);

export const getCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get(CART_API);
  return data.map((cartItem) => ({
    id: cartItem.id,
    itemId: cartItem.itemId,
    title: cartItem.title,
    price: cartItem.price,
    type: cartItem.type,
    size: cartItem.size,
    count: cartItem.count,
    imageUrl: cartItem.imageUrl,
  }));
});

export const addCartItem = createAsyncThunk(
  "cart/addItemCart",
  async (item) => {
    const { data } = await axios.post(CART_API, { ...item, itemId: item.id });
    return data;
  }
);

export const updateCartItemById = createAsyncThunk(
  "cart/updateCartItemById",
  async ({ id, updates }) => {
    const { data } = await axios.put(`${CART_API}/${id}`, updates);
    return data;
  }
);

export const removeCartItemById = createAsyncThunk(
  "cart/removeCartItemById",
  async (id) => {
    await axios.delete(`${CART_API}/${id}`);
    return id;
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const { cart } = thunkAPI.getState();
    const idsToDelete = cart.items
      .filter((item) => item.id)
      .map((item) => item.id);
    await Promise.all(
      idsToDelete.map((id) => axios.delete(`${CART_API}/${id}`))
    );
    return idsToDelete;
  }
);

const initialState = {
  fetchStatus: "loading",
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.items = [];
        state.fetchStatus = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalPrice = calcTotal(state.items);
        state.fetchStatus = "success";
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const saved = action.payload;
        state.items.push(saved);
        state.totalPrice = calcTotal(state.items);
      })
      .addCase(updateCartItemById.fulfilled, (state, action) => {
        const updated = action.payload;
        const item = state.items.find((i) => i.id === updated.id);
        if (item) item.count = updated.count;
        state.totalPrice = calcTotal(state.items);
      })
      .addCase(removeCartItemById.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
        state.totalPrice = calcTotal(state.items);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalPrice = 0;
      });
  },
});

export default cartSlice.reducer;
