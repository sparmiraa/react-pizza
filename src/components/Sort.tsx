import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SORT_OPTIONS } from "../constants/sortOptions";
import ArrowTopIcon from "./icons/ArrowTopIcon";
import { selectSort } from "../redux/slices/filterSlice";
import { SortOptions } from "../types/sortOptions";

type SortProps = {
  onChangeSort: (sort: SortOptions) => void;
};

export default React.memo(function Sort({ onChangeSort }: SortProps) {
  const sort = useSelector(selectSort);
  const [open, setOpen] = useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickListItem = (item: SortOptions) => {
    onChangeSort(item);
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
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
        <ArrowTopIcon style={{ marginRight: "0.5rem" }} />
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
});
