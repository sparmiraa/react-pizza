import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_PIZZA } from "../../api";
import { RootState } from "../store";

type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  description: string;
  rating: number;
};

type FetchPizzasParams = {
  page: number;
  limit: number;
  sortBy: string;
  order: string;
  category?: string;
  title?: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  FetchPizzasParams,
  { rejectValue: string }
>("pizza/fetchPizzasStatus", async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<Pizza[]>(API_PIZZA, { params });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        return [];
      }
      return rejectWithValue("Ошибка при загрузке");
    }

    return rejectWithValue("Неизвестная ошибка");
  }
});

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
