export const validateNumberField = <T extends Record<string, any>>(
  field: keyof T,
  fieldName: string,
  value: number | null,
  errors: Partial<Record<keyof T, string>>,
  options?: {
    min?: number;
    max?: number;
  }
) => {
  if (value === null || Number.isNaN(value)) {
    errors[field] = `${fieldName} обязательно`;
    return;
  }

  if (options?.min !== undefined && value < options.min) {
    errors[field] = `${fieldName} минимум ${options.min}`;
  }

  if (options?.max !== undefined && value > options.max) {
    errors[field] = `${fieldName} максимум ${options.max}`;
  }
};
