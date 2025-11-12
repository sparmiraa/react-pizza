import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {calculateTotlaPrice} from "../../utils/calculateTotlaPrice.js";
import {isItemEqual} from "../../utils/isItemEqual.js";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async () => {
    const {data} = await axios.get("https://690a76bf1a446bb9cc229d96.mockapi.io/cart")
    return data;
  }
)

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (payload, thunkAPI) => {
    const foundItem = thunkAPI.getState().cart.items.find((item) => isItemEqual(item, payload));
    if (foundItem) {
      const {data} = await axios.put(`https://690a76bf1a446bb9cc229d96.mockapi.io/cart/${foundItem.cartItemId}`, {
        ...foundItem,
        count: foundItem.count + 1
      });
      return data;
    } else {
      const {data} = await axios.post("https://690a76bf1a446bb9cc229d96.mockapi.io/cart/", {...payload, count: 1});
      return data;
    }
  }
)

// const incrementItemCountBySpecification = createAsyncThunk(
//   "cart/incrementItemCountBySpecification",
//   async (payload) => {
//
//   }
// )


const initialState = {
  totalPrice: 0,
  items: [],
  itemsFetchStatus: null,
  addItemOptions: {
    status: null,
    id: null
  },

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => isItemEqual(item, action.payload));

      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      } else {
        state.items.push({...action.payload, count: 1});
        state.totalPrice += action.payload.price;
      }
    },

    addItemCountById(state, action) {
      const item = state.items.find((item) => isItemEqual(item, action.payload));
      if (!item || item.count >= 9) return;
      item.count++;
      state.totalPrice += item.price;
    },

    minusItemCountById(state, action) {
      const item = state.items.find((item) => isItemEqual(item, action.payload));
      if (!item || item.count <= 1) return;
      item.count--;
      state.totalPrice -= item.price;
    },

    removeItemById(state, action) {
      const item = state.items.find((item) => isItemEqual(item, action.payload));
      if (!item) return;


      state.totalPrice -= item.price * item.count;
      state.items = state.items.filter((i) => !isItemEqual(i, action.payload));
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.itemsFetchStatus = 'loading';
        state.totalPrice = 0;
        state.items = [];
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.itemsFetchStatus = 'success';
        state.items = action.payload;
        state.totalPrice = calculateTotlaPrice(action.payload);
      })
      .addCase(getCart.rejected, (state) => {
        state.itemsFetchStatus = 'error';
        state.totalPrice = 0;
        state.items = [];
      })
      .addCase(addItemToCart.pending, (state, action) => {
        state.addItemOptions = {
          status: 'loading',
          id: action.meta.arg.id
        }
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.addItemOptions = {status: null, id: null}
        const foundItem = state.items.find((item) => isItemEqual(item, action.payload));
        if (foundItem) {
          foundItem.count = action.payload.count;
        } else {
          state.items.push(action.payload);
        }
        state.totalPrice = state.totalPrice + action.payload.price;
      })
      .addCase(addItemToCart.rejected, (state) => {
        state.addItemOptions = {
          status: null,
          id: null
        };
        state.totalPrice = 0;
        state.items = [];
      })
  }
});

export const {
  addItem,
  addItemCountById,
  minusItemCountById,
  removeItemById,
  clearItems,
} = cartSlice.actions;
export default cartSlice.reducer;
