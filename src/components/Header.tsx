import logoImg from "../assets/img/pizza-logo.svg";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search/Search";
import { useSelector } from "react-redux";
import CartIcon from "./icons/CartIcon";
import { selectCart } from "../redux/slices/cartSlice";
import { useState } from "react";
import { useAppSelector } from "../redux/store";
import { selectIsAdmin, selectUser } from "../redux/user/userSelectors";
import AuthModal from "./AuthModal/AuthModal";
import { AuthMode } from "./AuthModal/AuthModalTypes";

export default function Header() {
  const user = useAppSelector(selectUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0);

  return (
    <div className="header">
      {isAdmin && (
        <Link to="/admin/dashboard">
          <button className="container button admin-button">Admin Panel</button>
        </Link>
      )}
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
          {location.pathname !== "/cart" &&
            (user ? (
              <Link to="/cart" className="button button--cart">
                <span>{totalPrice} ₽</span>
                <div className="button__delimiter"></div>
                <CartIcon style={{ marginRight: "0.5rem" }} />
                <span>{totalCount}</span>
              </Link>
            ) : (
              <button
                className="button"
                onClick={() => {
                  setIsOpen(true);
                  setMode("login");
                }}
              >
                Войти
              </button>
            ))}
        </div>
      </div>

      {isOpen && (
        <AuthModal
          mode={mode}
          onClose={() => setIsOpen(false)}
          onSwitch={(m: AuthMode) => setMode(m)}
        />
      )}
    </div>
  );
}
