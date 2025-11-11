import React from "react";
import {useDispatch} from "react-redux";
import plusImg from "../../assets/img/plus.svg";
import {addItem} from "../../redux/slices/cartSlice";
import {toast} from "react-toastify";
import start from "./star.svg";

const TYPE_NAMES = ["тонкое", "традиционное"];

const MessageTemplate = ({title, size}) => {
  return (
    <>
      Пицца добавлена:
      <br/>
      {title}, {size} см.
    </>
  )
}

export default function PizzaBlock({id, imageUrl, title, description, price, sizes, types, rating}) {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: TYPE_NAMES[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
    setTimeout(() => toast.info(
      <MessageTemplate title={title} type={TYPE_NAMES[activeType]} size={sizes[activeSize]}/>, 400));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div className="pizza-block__image-wrapper">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
          <div className="pizza-block__image-rating">
            <img src={start} alt=""/> {rating}
          </div>
        </div>
        <h4 className="pizza-block__title">{title}</h4>
        <p className="pizza-block__description">
          {description}
        </p>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
              >
                {TYPE_NAMES[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <img src={plusImg} alt="" style={{marginRight: "0.5rem"}}/>
            <span>Добавить</span>
          </button>
        </div>
      </div>
    </div>
  );
}
