import { RootState } from "../store";

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthFieldErrors = (state: RootState) => state.auth.fieldErrors;