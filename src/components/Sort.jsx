import arrowTopImg from "../assets/img/arrow-top.svg"
import React from 'react'

const LIST_POPUP = ['популярности', 'цене', 'алфавиту']


export default function Sort() {
const [open, setOpen] = React.useState(false) 
const [selected, setSelected] = React.useState(0)

const onClickListItem = (index) => {
  setSelected(index);
  setOpen(false)
}

    return(
        <div className="sort">
        <div className="sort__label">
          <img src={arrowTopImg} alt="" style={{marginRight: '0.5rem'}}/>
          <b>Сортировка по:</b>
          <span onClick={() => setOpen(!open)}>{LIST_POPUP[selected]}</span>
        </div>
       {
        open && (
          <div className="sort__popup">
          <ul>
          {LIST_POPUP.map((popup, index) => (
            <li
              key={index}
              onClick={() => onClickListItem(index)}
              className={selected === index ? "active" : ""}
            >
              {popup}
            </li>
          ))}
          </ul>
        </div>
        )
       }
      </div>
    )
}