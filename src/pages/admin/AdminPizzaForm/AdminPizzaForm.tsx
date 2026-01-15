import { useParams } from "react-router-dom";
import styles from "./AdminPizzaForm.module.scss";
import { usePizzaForm } from "./usePizzaForm";
import { FormField } from "../../../components/admin/FormField/FormField"; 
import { SIZES, CATEGORIES, TYPE_NAMES } from "../../../constants/pizzaConstants";

export default function AdminPizzaFormPage() {
  const { pizzaId } = useParams();
  const isEdit = Boolean(pizzaId);

  const { pizza, setPizza, priceInput, errors, setPriceInput, handleSubmit } =
    usePizzaForm(pizzaId);

  const onChangePizzaTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPizza((prev) => ({ ...prev, title: e.target.value }));

  const onChangePizzaPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceInput(value);
    const numberValue = Number(value);
    setPizza((prev) => ({ ...prev, price: isNaN(numberValue) ? 0 : numberValue }));
  };

  const onChangePizzaDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPizza((prev) => ({ ...prev, description: e.target.value }));

  const onChangePizzaImageUrlHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPizza((prev) => ({ ...prev, imageUrl: e.target.value }));

  const onChangePizzaCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPizza((prev) => ({ ...prev, category: Number(e.target.value) }));

  const onChangePizzaTypesHandler = (typeId: number) => {
    setPizza((prev) => ({
      ...prev,
      types: prev.types.includes(typeId)
        ? prev.types.filter((id) => id !== typeId)
        : [...prev.types, typeId],
    }));
  };

  const onChangePizzaSizesHandler = (size: number) => {
    setPizza((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={styles.stickyHeader}>
        <h1>{isEdit ? "Редактирование пиццы" : "Создание пиццы"}</h1>
        <button type="submit">
          {isEdit ? "Обновить пиццу" : "Создать пиццу"}
        </button>
      </div>

      <FormField label="Название" error={errors.title}>
        <input value={pizza.title} onChange={onChangePizzaTitleHandler} />
      </FormField>

      <FormField label="Цена" error={errors.price}>
        <input type="number" value={priceInput} onChange={onChangePizzaPriceHandler} />
      </FormField>

      <FormField label="Описание" error={errors.description}>
        <textarea value={pizza.description} onChange={onChangePizzaDescriptionHandler} />
      </FormField>

      <FormField label="Ссылка на изображение" error={errors.imageUrl}>
        <input value={pizza.imageUrl} onChange={onChangePizzaImageUrlHandler} />
      </FormField>

      {pizza.imageUrl && <img className={styles.preview} src={pizza.imageUrl} alt="Pizza" />}

      <FormField label="Категория" error={errors.category}>
        <select value={pizza.category ?? ""} onChange={onChangePizzaCategoryHandler}>
          <option value="" disabled>
            Выберите категорию
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Типы теста" error={errors.types}>
        <div className={styles.checkboxGroup}>
          {TYPE_NAMES.map((name, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={pizza.types.includes(index)}
                onChange={() => onChangePizzaTypesHandler(index)}
              />
              {name}
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Размеры" error={errors.sizes}>
        <div className={styles.checkboxGroup}>
          {SIZES.map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                checked={pizza.sizes.includes(size)}
                onChange={() => onChangePizzaSizesHandler(size)}
              />
              {size} см
            </label>
          ))}
        </div>
      </FormField>
    </form>
  );
}
