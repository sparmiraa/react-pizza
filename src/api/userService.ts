import { UserProfile } from "../redux/user/userTypes";
import { privateInstance } from "./axios";

export const UserService = {
  getMe() {
    return privateInstance.get<UserProfile>("/users/me");
  },
};
