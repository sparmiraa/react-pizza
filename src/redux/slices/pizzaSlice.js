import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PIZZA_API = "https://690399efd0f10a340b250ab6.mockapi.io/items";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(PIZZA_API, { params });
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      return rejectWithValue();
    }
  }
);


const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizza = (state) => state.pizza;

export default pizzaSlice.reducer;
