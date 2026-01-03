import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./authThunks";
import { AuthState } from "./authTypes";

const initialState: AuthState = {
  status: "idle",
  error: null as string | null,
  fieldErrors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
      state.fieldErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "error";

        if (action.payload?.errors) {
          state.error = action.payload.message;
          state.fieldErrors = action.payload.errors.reduce(
            (acc, err) => {
              acc[err.field] = err.message;
              return acc;
            },
            {} as Record<string, string>
          );
        } else {
          state.error = action.payload?.message || "Login error";
        }
      })

      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = "error";
        
        if (action.payload?.errors) {
          state.error = action.payload.message;
          state.fieldErrors = action.payload.errors.reduce(
            (acc, err) => {
              acc[err.field] = err.message;
              return acc;
            },
            {} as Record<string, string>
          );
        } else {
          state.error = action.payload?.message || "Registration error";
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
