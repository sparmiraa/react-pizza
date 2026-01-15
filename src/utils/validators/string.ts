import { StringValidationOptions } from "./validatorsTypes";

export const validateStringField = <T extends Record<string, any>>(
  field: keyof T,
  fieldName: string,
  value: string,
  options: StringValidationOptions,
  errors: Partial<Record<keyof T, string>>
) => {
  const normalized = value.trim();

  if (options.required && normalized.length === 0) {
    errors[field] = `${fieldName} не может быть пустым`;
    return;
  }

  if (
    options.minLength !== undefined &&
    normalized.length < options.minLength
  ) {
    errors[field] = `${fieldName} минимум ${options.minLength} символов`;
    return;
  }

  if (
    options.maxLength !== undefined &&
    normalized.length > options.maxLength
  ) {
    errors[field] = `${fieldName} максимум ${options.maxLength} символов`;
  }
};
