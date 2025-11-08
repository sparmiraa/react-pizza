import arrowTopImg from "../assets/img/arrow-top.svg";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setSort } from "../redux/slices/filterSlice";

const LIST_POPUP = [
  { name: "популярности (DESC)", sortProperty: "rating" },
  { name: "популярности (ASC)", sortProperty: "-rating" },
  { name: "цене (DESC)", sortProperty: "price" },
  { name: "цене (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];

export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(state => state.filter.sort)


  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj))
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <img src={arrowTopImg} alt="" style={{ marginRight: "0.5rem" }} />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen((prev) => !prev)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {LIST_POPUP.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
