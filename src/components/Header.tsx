import logoImg from "../assets/img/pizza-logo.svg";

import { Link, useLocation } from "react-router-dom";
import Search from "./Search/Search";
import { useSelector } from "react-redux";
import CartIcon from "./icons/CartIcon";
import { selectCart } from "../redux/slices/cartSlice";

export default function Header() {
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();

  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo-link">
          <div className="header__logo">
            <img width="38" src={logoImg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {location.pathname !== "/cart" && <Search />}
        <div className="header__cart">
          {location.pathname !== "/cart" && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <CartIcon style={{ marginRight: "0.5rem" }} />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
