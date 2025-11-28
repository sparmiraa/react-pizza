import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { useFilter } from "../../hook/useFilter.js";
import RemoveIcon from "../icons/RemoveIcon.jsx";
import SearchIcon from "../icons/SearchIcon.jsx";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const { searchParams, updateSearchParams } = useFilter();

  const onClickClear = () => {
    setSearchValue("");
    updateSearchParams({ search: "" });
    inputRef.current?.focus();
  };

  useEffect(() => {
    const newSearch = searchParams.get("search") || "";
    setSearchValue(newSearch);
  }, [searchParams]);

  const updateSearchValue = useCallback(
    debounce((value) => {
      updateSearchParams({ search: value, page: 1 });
    }, 350),
    [searchParams]
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} />
      <input
        ref={inputRef}
        value={searchValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />

      {searchValue && (
        <RemoveIcon
          onClick={() => onClickClear()}
          className={styles.clearIcon}
        />
      )}
    </div>
  );
}
