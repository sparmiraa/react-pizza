import React from "react"

export default function PizzaBlock(props) {
const typeNames = ['тонкое', 'традиационное']

const [activeType, setActiveType] = React.useState(0)
const [activeSize, setActiveSize] = React.useState(0)

    return(
        <div className="pizza-block">
              <img
                className="pizza-block__image"
                src={props.imageUrl}
                alt="Pizza"
              />
              <h4 className="pizza-block__title">{props.title}</h4>

              <div className="pizza-block__selector">
                <ul>
                  {
                    props.types.map((typeId) => (
                      <li onClick={() => setActiveType(typeId)} className={activeType === typeId ? "active" : ""} >{typeNames[typeId]}</li>
                    ))
                  }
                </ul>
                <ul>
                  {
                    props.sizes.map((size, index) => <li onClick={() => setActiveSize(index)} className={activeSize === index ? "active" : ""} >{size} см.</li>)
                  }
                </ul>
              </div>

              <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {props.price} ₽</div>
                <button className="button button--outline button--add">
                  <img
                    src="/img/plus.svg"
                    alt=""
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span>Добавить</span>
                  <i>0</i>
                </button>
              </div>
            </div>
    )
}