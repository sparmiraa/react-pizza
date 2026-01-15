import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

export const CATEGORIES = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
            
export default React.memo(function Categories({
  value,
  onChangeCategory,
}: CategoriesProps) {
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((categoryName, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
            key={index}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
