import logoImg from "../assets/img/pizza-logo.svg";
import cartImg from "../assets/img/cart.svg";
import { Link } from "react-router-dom";
import Search from "./Search/Search";

export default function Header({ searchValue, setSearchValue }) {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoImg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search searchValue={searchValue}  setSearchValue={setSearchValue} />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>520 ₽</span>
            <div className="button__delimiter"></div>
            <img src={cartImg} alt="" style={{ marginRight: "0.5rem" }} />
            <span>3</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
