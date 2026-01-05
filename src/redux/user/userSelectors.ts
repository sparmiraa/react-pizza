import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user
export const selectUserStatus = (state: RootState) => state.user.status

export const selectIsAuth = (state: RootState) => Boolean(state.user.user)
export const selectIsAdmin = (state: RootState) =>
    state.user.user?.roles?.some((role) => role === "ADMIN") ?? false;