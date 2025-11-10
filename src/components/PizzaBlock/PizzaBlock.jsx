import React from "react";
import { useDispatch, useSelector } from "react-redux";
import plusImg from "../../assets/img/plus.svg";
import { addItem } from "../../redux/slices/cartSlice";

const TYPE_NAMES = ["тонкое", "традиционное"];

export default function PizzaBlock({ id, imageUrl, title, price, sizes, types }) {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (obj) =>
        obj.id === id &&
        obj.type === TYPE_NAMES[activeType] &&
        obj.size === sizes[activeSize]
    )
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: TYPE_NAMES[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>

        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
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
                key={size}
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
          <button onClick={onClickAdd} className="button button--outline button--add">
            <img src={plusImg} alt="" style={{ marginRight: "0.5rem" }} />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
