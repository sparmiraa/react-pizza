import logoImg from '../assets/img/pizza-logo.svg';
import cartImg from '../assets/img/cart.svg';

export default function Header() {
    return(
        <div className="header">
        <div className="container">
          <div className="header__logo">
            <img width="38" src={logoImg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>

          <div className="header__cart">
            <a href="/cart.html" className="button button--cart">
              <span>520 ₽</span>
              <div className="button__delimiter"></div>
              <img src={cartImg} alt="" style={{marginRight: '0.5rem'}}/>
              <span>3</span>
            </a>
          </div>
        </div>
      </div>
    )
}