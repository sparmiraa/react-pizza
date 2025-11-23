import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  selectCartItem,
  updateCartItemById,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import PlusIcon from "../icons/PlusIcon";
import StarIcon from "../icons/StarIcon";
import { Link } from "react-router-dom";

const TYPE_NAMES = ["тонкое", "традиционное"];

const MessageTemplate = ({ title, size }) => (
  <>
    Пицца добавлена:
    <br />
    {title}, {size} см.
  </>
);

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
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const cartItem = useSelector((state) =>
    selectCartItem(state, {
      id,
      type: TYPE_NAMES[activeType],
      size: sizes[activeSize],
    })
  );

  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = async () => {
    setIsLoading(true);
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: TYPE_NAMES[activeType],
      size: sizes[activeSize],
      count: 1,
    };
    const isUpdating = Boolean(cartItem);
    try {
      if (isUpdating) {
        await dispatch(
          updateCartItemById({
            id: cartItem.id,
            updates: { count: cartItem.count + 1 },
          })
        ).unwrap();
      } else {
        await dispatch(addCartItem(item)).unwrap();
      }

      toast.info(<MessageTemplate title={title} size={sizes[activeSize]} />);
    } catch (error) {
      toast.error("Не удалось добавить пиццу. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <div className="pizza-block__image-wrapper">
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" draggable={false} />
            <div className="pizza-block__image-rating">
              <StarIcon /> {rating}
            </div>
          </div>
        </Link>
        <Link to={`/pizza/${id}`}>
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

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
            disabled={addedCount === 9 || isLoading}
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <PlusIcon />
            <span style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }}>
              Добавить
            </span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
