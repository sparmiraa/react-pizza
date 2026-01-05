import axios from "axios";

export type FieldErrors = Record<string, string>;

export function parseApiError(err: unknown): {
  fieldErrors?: FieldErrors;
  message?: string;
} {
  if (!axios.isAxiosError(err)) {
    return { message: "Попробуйте позже" };
  }

  const data = err.response?.data;

  if (data?.errors?.length) {
    return {
      fieldErrors: data.errors.reduce((acc: FieldErrors, e: any) => {
        acc[e.field] = e.message;
        return acc;
      },
      {}
    ),
    };
  }

  return {
    message: data?.message || "Ошибка сервера",
  }
}
