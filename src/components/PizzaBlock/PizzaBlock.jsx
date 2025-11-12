import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../redux/slices/cartSlice";
import {toast} from "react-toastify";
import PlusIcon from "../icons/PlusIcon";
import StarIcon from "../icons/StarIcon";

const TYPE_NAMES = ["тонкое", "традиционное"];

export default function PizzaBlock({
                                     id,
                                     imageUrl,
                                     title,
                                     price,
                                     sizes,
                                     types,
                                     description,
                                     rating,
                                   }) {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const MessageTemplate = ({title, size}) => {
    return (
      <>
        Пицца добавлена:
        <br/>
        {title}, {size} см.
      </>
    );
  };

  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (obj) =>
        obj.id === id &&
        obj.type === TYPE_NAMES[activeType] &&
        obj.size === sizes[activeSize]
    )
  );

  const addItemOptions = useSelector((state) => state.cart.addItemOptions);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: TYPE_NAMES[activeType],
      size: sizes[activeSize],
    };

    dispatch(addItemToCart(item)).then((action) => {
      if (addItemToCart.fulfilled.match(action))
        toast.info(<MessageTemplate title={action.payload.title} size={action.payload.size}/>);
    });
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div className="pizza-block__image-wrapper">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
          <div className="pizza-block__image-rating">
            <StarIcon/> {rating}
          </div>
        </div>
        <h4 className="pizza-block__title">{title}</h4>
        <p className="pizza-block__description">{description}</p>

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
          <button
            disabled={addedCount === 9 || addItemOptions.status === "loading" && addItemOptions.id === id}
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <PlusIcon/>
            <span style={{marginLeft: "0.3rem", marginRight: "0.3rem"}}>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
