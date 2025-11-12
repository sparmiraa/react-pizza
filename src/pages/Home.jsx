import React, {useEffect} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import NotFoundItems from "../components/NotFoundItems/NotFoundItems";
import FetchError from '../components/FetchError/FetchError.jsx'
import {SORT_OPTIONS} from "../constants/sortOptions";
import {useFilter} from "../hook/useFilter.js";
import {fetchPizzas} from "../redux/slices/pizzaSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getCart} from "../redux/slices/cartSlice.js";

const EMPTY_SKELETONS = [...new Array(4)];
const PAGE_LIMIT = 4;

export default function Home() {
  const dispatch = useDispatch();
  const {items, status} = useSelector((state) => state.pizza);

  const {updateSearchParams, searchParams, categoryId, currentPage} = useFilter();

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
    const getPizzas = () => {

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
        ...(urlCategoryId &&
          Number(urlCategoryId) > 0 && {category: urlCategoryId}),
        ...(urlSearch && {title: urlSearch}),
      };

      dispatch(fetchPizzas(params));

    };
    getPizzas();
  }, [searchParams]);

  const pizzas = React.useMemo(
    () => items.map((obj) => <PizzaBlock {...obj} key={obj.id}/>),
    [items]
  );
  const skeletons = React.useMemo(
    () => EMPTY_SKELETONS.map((_, index) => <Skeleton key={index}/>),
    []
  );

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort onChangeSort={onChangeSort}/>
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === 'loading' ? (
        <div className="content__items">{skeletons}</div>
      ) : status === 'error' ? (
        <FetchError/>
      ) : items.length === 0 ? (
        <NotFoundItems/>
      ) : (
        <div className="content__items">{pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
}