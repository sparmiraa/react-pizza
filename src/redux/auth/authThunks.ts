import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicInstance } from "../../api/axiosPublic";
import { getMeThunk } from "../user/userThunks";
import { LoginPayload, RegisterPayload } from "./authTypes";
import axios from "axios";

export const loginThunk = createAsyncThunk<
  boolean,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { dispatch, rejectWithValue }) => {
try {
  const { data } = await publicInstance.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("accessToken", data.accessToken);

  await dispatch(getMeThunk());

  return true;
} catch (e) {
  if(axios.isAxiosError(e)) {
    return rejectWithValue(
      e.response?.data || "Login error"
    )
  }

  return rejectWithValue("Unexpected error")
}
});

export const registerThunk = createAsyncThunk<
  boolean,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/register",
  async (
    { firstName, lastName, email, password },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await publicInstance.post("/auth/registration", {
        firstName,
        lastName,
        email,
        password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      await dispatch(getMeThunk());

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Registration error"
        );
      }

      return rejectWithValue("Unexpected error");
    }
  }
);