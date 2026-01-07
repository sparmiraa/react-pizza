export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
}
