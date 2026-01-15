import { useAppDispatch } from "../redux/store";
import {
  removeCartItemById,
  updateCartItemById,
} from "../redux/slices/cartSlice";
import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";
import RemoveIcon from "./icons/RemoveIcon";
import { TYPE_NAMES } from "../constants/pizzaConstants";

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: number;
  size: number;
};

export default function CartItem({
  id,
  title,
  price,
  count,
  imageUrl,
  type,
  size,
}: CartItemProps) {
  const dispatch = useAppDispatch();

  const onClickPlus = () => {
    dispatch(updateCartItemById({ id, updates: { count: count + 1 } }));
  };

  const onClickMinus = () => {
    dispatch(updateCartItemById({ id, updates: { count: count - 1 } }));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите убрать пиццу?")) {
      dispatch(removeCartItemById(id));
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
          {TYPE_NAMES[type]} тесто, {size} см.
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
        <div>
          <RemoveIcon
            onClick={onClickRemove}
            className="button button--outline button--circle"
          />
        </div>
      </div>
    </div>
  );
}
