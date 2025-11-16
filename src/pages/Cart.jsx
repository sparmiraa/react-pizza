import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { clearItems, fetchCart, clearCart } from "../redux/slices/cartSlice";
import CartEmpty from "../components/CartEmpty";
import CartIcon from "../components/icons/CartIcon";
import TrashIcon from "../components/icons/TrashIcon";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";

export default function Cart() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);

  React.useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const onClickClear = async () => {
    if (!window.confirm("Очистить корзину?")) return;
  
    try {
      await dispatch(clearCart()).unwrap(); 
      
      dispatch(clearItems());
    } catch (error) {
      console.error("Ошибка очистки корзины:", error);
    }
  };
  

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  if (!items.length) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartIcon />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <TrashIcon />
            <span>Очистить корзину</span>
          </div>
        </div>

        <div className="content__items">
          {items.map((item) => (
            <CartItem key={`${item.mockapiId}`} {...item} />
          ))}
        </div>

        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <ArrowLeftIcon />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
