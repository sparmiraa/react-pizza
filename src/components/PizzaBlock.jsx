import React from "react";

import plusImg from "../assets/img/plus.svg";

const TYPE_NAMES = ["тонкое", "традиационное"];

export default function PizzaBlock({imageUrl, title, price, sizes, types}) {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>

      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? "active" : ""}
            >
              {TYPE_NAMES[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add">
          <img src={plusImg} alt="" style={{ marginRight: "0.5rem" }} />
          <span>Добавить</span>
          <i>0</i>
        </button>
      </div>
    </div>
  );
}
