import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemCart, updateItemCart} from "../../redux/slices/cartSlice";
import {toast} from "react-toastify";
import PlusIcon from "../icons/PlusIcon";
import StarIcon from "../icons/StarIcon";

const TYPE_NAMES = ["тонкое", "традиционное"];

export const MessageTemplate = ({title, size}) => (
  <>
    Пицца добавлена:
    <br/>
    {title}, {size} см.
  </>
);

const ErrorMessageTemplate = () => (
  <>
    Ошибка во время добавления.
    <br/>
    Попробуйте позже.
  </>
);

export default function PizzaBlock({item}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (obj) =>
        obj.id === item.id &&
        obj.type === TYPE_NAMES[activeType] &&
        obj.size === item.sizes[activeSize]
    )
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickUpdate = () => {
    setIsLoading(true);

    const updateDetails = {
      id: cartItem.mockapiId,
      updates: {count: cartItem.count + 1}
    }
    dispatch(updateItemCart(updateDetails)).then(action => {
      if (updateItemCart.fulfilled.match(action)) {
        toast.info(<MessageTemplate title={item.title} size={item.sizes[activeSize]}/>);
      } else if (updateItemCart.rejected.match(action)) {
        toast.error(<ErrorMessageTemplate/>);
      }
      setIsLoading(false);
    });
  }

  const onClickAdd = async () => {
    const saveDetails = {
      ...item,
      type: TYPE_NAMES[activeType],
      size: item.sizes[activeSize], count: 1,
    };
    setIsLoading(true);
    dispatch(addItemCart(saveDetails)).then(action => {
      if (addItemCart.fulfilled.match(action)) {
        toast.info(<MessageTemplate title={item.title} size={item.sizes[activeSize]}/>);
      } else if (addItemCart.rejected.match(action)) {
        toast.error(<ErrorMessageTemplate/>);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div className="pizza-block__image-wrapper">
          <img className="pizza-block__image" src={item.imageUrl} alt="Pizza"/>
          <div className="pizza-block__image-rating">
            <StarIcon/> {item.rating}
          </div>
        </div>
        <h4 className="pizza-block__title">{item.title}</h4>
        <p className="pizza-block__description">{item.description}</p>

        <div className="pizza-block__selector">
          <ul>
            {item.types.map((typeId) => (
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
            {item.sizes.map((size, index) => (
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
          <div className="pizza-block__price">от {item.price} ₽</div>
          <button
            disabled={addedCount === 9 || isLoading}
            onClick={cartItem ? onClickUpdate : onClickAdd}
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
