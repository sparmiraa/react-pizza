import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_CART } from "../../api";
import { RootState } from "../store";
import { CartItemType } from "../../types/cartItemType";


type UpdateCartItemPayload = {
  id: string;
  updates: Partial<CartItemType>;
};

interface CartSliceState {
  fetchStatus: string;
  items: CartItemType[];
  totalPrice: number;
}

type CartItemKey = { id: number; type: number; size: number };

const calcTotal = (items: CartItemType[]) =>
  items.reduce((sum, i) => sum + i.price * i.count, 0);

export const getCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get<CartItemType[]>(API_CART);
  return data.map((cartItem) => ({
    id: cartItem.id,
    itemId: Number(cartItem.itemId),
    title: cartItem.title,
    price: cartItem.price,
    type: Number(cartItem.type),
    size: Number(cartItem.size),
    count: Number(cartItem.count),
    imageUrl: cartItem.imageUrl,
  }));
});

export const addCartItem = createAsyncThunk<CartItemType, CartItemType>(
  "cart/addItemCart",
  async (item) => {
    const payload = { ...item, itemId: Number(item.id) };
    const { data } = await axios.post(API_CART, payload);
    return {
      ...data,
      itemId: Number(data.itemId),
    } as CartItemType;
  }
);

export const updateCartItemById = createAsyncThunk<
  CartItemType,
  UpdateCartItemPayload
>("cart/updateCartItemById", async ({ id, updates }: UpdateCartItemPayload) => {
  const { data } = await axios.put(`${API_CART}/${id}`, updates);
  return data;
});

export const removeCartItemById = createAsyncThunk<string, string>(
  "cart/removeCartItemById",
  async (id) => {
    await axios.delete(`${API_CART}/${id}`);
    return id;
  }
);

export const clearCart = createAsyncThunk<string[], void, { state: RootState }>(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const { cart } = thunkAPI.getState();
    const idsToDelete = cart.items.map((item) => item.id);
    await Promise.all(
      idsToDelete.map((id) => axios.delete(`${API_CART}/${id}`))
    );
    return idsToDelete;
  }
);

const initialState: CartSliceState = {
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItem = (
  state: RootState,
  { id, type, size }: CartItemKey
) => {
  return state.cart.items.find(
    (obj) => obj.itemId === id && obj.type === type && obj.size === size
  );
};

export default cartSlice.reducer;
