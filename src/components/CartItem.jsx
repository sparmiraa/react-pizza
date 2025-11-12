import React from "react";
import { useDispatch } from "react-redux";
import {
  addItemCountById,
  minusItemCountById,
  removeItemById,
} from "../redux/slices/cartSlice";
import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";
import RemoveIcon from "./icons/RemoveIcon";

export default function CartItem({
  id,
  title,
  price,
  count,
  imageUrl,
  type,
  size,
}) {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItemCountById({ id, type, size }));
  };

  const onClickMinus = () => {
    dispatch(minusItemCountById({ id, type, size }));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите убрать пиццу?")) {
      dispatch(removeItemById({ id, type, size }));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
        <p>{price} ₽</p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
          disabled={count === 1}
        >
          <MinusIcon />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
          disabled={count === 9}
        >
          <PlusIcon />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
}
