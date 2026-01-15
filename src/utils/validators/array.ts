export const validateArrayField = <
  T extends Record<string, any>
>(
  field: keyof T,
  fieldName: string,
  value: unknown[],
  errors: Partial<Record<keyof T, string>>,
  minLength = 1
) => {
  if (!Array.isArray(value) || value.length < minLength) {
    errors[field] = `Выберите хотя бы один вариант (${fieldName})`;
  }
};