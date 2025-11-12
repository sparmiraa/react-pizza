import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { useFilter } from "../../hook/useFilter.js";
import RemoveIcon from "../icons/RemoveIcon.jsx";
import SearchIcon from "../icons/SearchIcon.jsx";

export default function Search() {
  const [value, setValue] = useState("");

  const inputRef = useRef(null);
  const { searchParams, updateSearchParams } = useFilter();

  const onClickClear = () => {
    setValue("");
    updateSearchParams({ search: "" });
    inputRef.current.focus();
  };

  useEffect(() => {
    const newSearch = searchParams.get("search") || "";
    setValue(newSearch);
  }, [searchParams]);

  const updateSearchValue = useCallback(
    debounce((value) => {
      updateSearchParams({ search: value, page: 1 });
    }, 350),
    [searchParams]
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />

      {value && (
        <RemoveIcon
          onClick={() => onClickClear()}
          className={styles.clearIcon}
        />
      )}
    </div>
  );
}
