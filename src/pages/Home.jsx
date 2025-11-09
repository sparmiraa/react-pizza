import React, {useCallback, useEffect, useRef} from "react";
import axios from "axios";

import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setFilters} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import NotFoundItems from "../components/NotFoundItems/NotFoundItems";
import {SORT_OPTIONS} from "../constants/sortOptions";

const EMPTY_SKELETONS = [...new Array(4)];
const PAGE_LIMIT = 4;

export default function Home() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {categoryId, currentPage, search} = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const isInitialMount = useRef(true);

  const updateSearchParams = useCallback((updates) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "" ||
          (key === "categoryId" && value === 0) ||
          (key === "page" && value === 1) ||
          (key === "sortProperty" && value === SORT_OPTIONS[0].sortProperty)) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      if (newParams.toString() !== prevParams.toString()) {
        return newParams;
      }
      return prevParams;
    });
  }, [setSearchParams]);

  useEffect(() => {
    const urlCategoryId = searchParams.get("categoryId");
    const urlPage = searchParams.get("page");
    const urlSortProperty = searchParams.get("sortProperty");
    const urlSearch = searchParams.get("search");

    const urlCategoryIdNumber = urlCategoryId ? Number(urlCategoryId) : 0;
    const urlPageNumber = urlPage ? Number(urlPage) : 1;
    const urlSortObj = urlSortProperty
      ? SORT_OPTIONS.find((obj) => obj.sortProperty === urlSortProperty) || SORT_OPTIONS[0]
      : SORT_OPTIONS[0];

    dispatch(setFilters({
      categoryId: urlCategoryIdNumber,
      currentPage: urlPageNumber,
      sort: urlSortObj,
      search: urlSearch
    }));

  }, [searchParams, dispatch]);

  useEffect(() => {
    if (isInitialMount.current) { // первый рендер, search равен ""
      isInitialMount.current = false;
      return;
    }
    updateSearchParams({search: search || null, page: 1});
  }, [search]);

  const onChangeCategory = (id) => {
    updateSearchParams({categoryId: id, page: 1, search: ""});
  };

  const onChangePage = (pageNumber) => {
    updateSearchParams({page: pageNumber});
  };

  const onChangeSort = (sortObj) => {
    updateSearchParams({sortProperty: sortObj.sortProperty, page: 1});
  };

  useEffect(() => {
    setIsLoading(true);

    const urlCategoryId = searchParams.get("categoryId");
    const urlSortProperty = searchParams.get("sortProperty") || SORT_OPTIONS[0].sortProperty;
    const urlSearch = searchParams.get("search") || "";
    const urlPage = Number(searchParams.get("page")) || 1;

    const queryOrderBy = urlSortProperty.includes("-") ? "asc" : "desc";
    const querySortBy = urlSortProperty.replace("-", "");

    const params = {
      page: urlPage,
      limit: PAGE_LIMIT,
      sortBy: querySortBy,
      order: queryOrderBy,
      ...(urlCategoryId && Number(urlCategoryId) > 0 && {category: urlCategoryId}),
      ...(urlSearch && {title: urlSearch}),
    };

    axios
      .get("https://690399efd0f10a340b250ab6.mockapi.io/items", {params})
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id}/>);

  const skeletons = React.useMemo(() => EMPTY_SKELETONS.map((_, index) => <Skeleton key={index}/>), []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort onChangeSort={onChangeSort}/>
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {isLoading ? (
        <div className="content__items">{skeletons}</div>
      ) : items.length === 0 ? (
        <NotFoundItems/>
      ) : (
        <div className="content__items">{pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
}