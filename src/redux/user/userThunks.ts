import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfile } from "./userTypes";
import { UserService } from "../../api/services/userService";

export const getMeThunk = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("user/getMe", async (_, { rejectWithValue }) => {
  try {
    const { data } = await UserService.getMe();
    return data;
  } catch (e) {
    return rejectWithValue("Не удалось получить пользователя");
  }
});