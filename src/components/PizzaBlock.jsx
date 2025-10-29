export default function PizzaBlock() {
    return(
        <div className="pizza-block">
              <img
                className="pizza-block__image"
                src="https://media.dodostatic.net/image/r:233x233/01995c42f704740cae3253e3af6994dc.avif"
                alt="Pizza"
              />
              <h4 className="pizza-block__title">Чизбургер-пицца</h4>

              <div className="pizza-block__selector">
                <ul>
                  <li className="active">тонкое</li>
                  <li>традиционное</li>
                </ul>
                <ul>
                  <li className="active">26 см.</li>
                  <li>30 см.</li>
                  <li>40 см.</li>
                </ul>
              </div>

              <div className="pizza-block__bottom">
                <div className="pizza-block__price">от 395 ₽</div>
                <div className="button button--outline button--add">
                  <img
                    src="/img/plus.svg"
                    alt=""
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span>Добавить</span>
                  <i>2</i>
                </div>
              </div>
            </div>
    )
}