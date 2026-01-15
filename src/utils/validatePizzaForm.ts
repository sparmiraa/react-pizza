import { PizzaForm } from "../pages/admin/AdminPizzaForm/AdminPizzaFormTypes";
import { validateArrayField } from "./validators/array";
import { validateNumberField } from "./validators/number";
import { validateStringField } from "./validators/string";
import { PizzaFormErrors } from "./validators/validatorsTypes";

export const validatePizzaForm = (data: PizzaForm) => {
  const errors: PizzaFormErrors = {};

  validateStringField<PizzaForm>(
    "title",
    "Название",
    data.title,
    { required: true, minLength: 3, maxLength: 40 },
    errors
  );

  validateNumberField<PizzaForm>("price", "Цена", data.price, errors, {
    min: 1,
    max: 10000,
  });

  validateStringField<PizzaForm>(
    "description",
    "Описание",
    data.description,
    { required: true, minLength: 10, maxLength: 200 },
    errors
  );

  validateStringField<PizzaForm>(
    "imageUrl",
    "Ссылка на изображение",
    data.imageUrl,
    { required: true },
    errors
  );

  validateNumberField<PizzaForm>(
    "category",
    "Категория",
    data.category,
    errors
  );

  validateArrayField<PizzaForm>("types", "Тесто", data.types, errors);

  validateArrayField<PizzaForm>("sizes", "Размеры", data.sizes, errors);

  return errors;
};
