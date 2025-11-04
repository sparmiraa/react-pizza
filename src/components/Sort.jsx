import arrowTopImg from "../assets/img/arrow-top.svg";
import React from "react";

const LIST_POPUP = [
  { name: "популярности (DESC)", sortProperty: "rating" },
  { name: "популярности (ASC)", sortProperty: "-rating" },
  { name: "цене (DESC)", sortProperty: "price" },
  { name: "цене (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];

export default function Sort({ value, onChangeSort }) {
  const [open, setOpen] = React.useState(false);

  const onClickListItem = (index) => {
    onChangeSort(index);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <img src={arrowTopImg} alt="" style={{ marginRight: "0.5rem" }} />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen((prev) => !prev)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {LIST_POPUP.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
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
