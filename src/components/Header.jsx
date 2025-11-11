import logoImg from "../assets/img/pizza-logo.svg";
import cartImg from "../assets/img/cart.svg";
import {Link, useLocation} from "react-router-dom";
import Search from "./Search/Search";
import {useSelector} from "react-redux";

export default function Header() {
  const {items, totalPrice} = useSelector(state => state.cart)

  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  const location = useLocation();

  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo-link">
          <div className="header__logo">
            <img width="38" src={logoImg} alt="Pizza logo"/>
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {location.pathname !== "/cart" && <Search/>}
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img src={cartImg} alt="" style={{marginRight: "0.5rem"}}/>
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
