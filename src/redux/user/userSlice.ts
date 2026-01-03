import { createSlice } from "@reduxjs/toolkit";
import { getMeThunk } from "./userThunks";
import { UserState } from "./userTypes";

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
    },
    clearUser(state) {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.user = null;
        state.status = "failed";
        state.error = action.payload || "Error";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
