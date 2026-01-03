import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfile } from "./userTypes";
import { privateInstance } from "../../api/axiosPrivate";

export const getMeThunk = createAsyncThunk<UserProfile, void, {rejectValue: string}>(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateInstance.get<UserProfile>("/users/me")
      return data
    } catch (e) {
      return rejectWithValue("Не удалось получить пользователя")
    }
  }
)