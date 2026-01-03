export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fieldErrors: FieldErrors;
}

export interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
