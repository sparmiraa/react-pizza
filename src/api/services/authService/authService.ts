import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponseDto,
} from "./authTypes";
import { publicInstance } from "../../axios";

export const AuthService = {
  login(dto: AuthLoginDto) {
    return publicInstance.post<AuthResponseDto>("/auth/login", dto);
  },

  registration(dto: AuthRegisterDto) {
    return publicInstance.post<AuthResponseDto>("/auth/registration", dto);
  },
};
