import arrowTopImg from "../assets/img/arrow-top.svg";
import React, {useState} from "react";
import {useSelector} from 'react-redux'
import {SORT_OPTIONS} from "../constants/sortOptions";

export default function Sort({onChangeSort}) {
  const sort = useSelector(state => state.filter.sort)
  const [open, setOpen] = useState(false);
  const sortRef = React.useRef()

  const onClickListItem = (obj) => {
    onChangeSort(obj);
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
  
    document.body.addEventListener("click", handleClickOutside);
  
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <img src={arrowTopImg} alt="" style={{marginRight: "0.5rem"}}/>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen((prev) => !prev)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {SORT_OPTIONS.map((obj, index) => (
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
