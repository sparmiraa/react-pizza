import React from "react";
import axios from "axios";
import qs from "qs";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import NotFoundItems from "../components/NotFoundItems/NotFoundItems";
import { SearchContext } from "../App";
import { SORT_OPTIONS } from "../constants/sortOptions";

const EMPTY_SKELETONS = [...new Array(4)];
const PAGE_LIMIT = 4;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const orderBy = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");

    const params = {
      page: currentPage,
      limit: PAGE_LIMIT,
      sortBy,
      order: orderBy,
      ...(categoryId > 0 && { category: categoryId }),
      ...(searchValue && { search: searchValue }),
    };

    axios
      .get("https://690399efd0f10a340b250ab6.mockapi.io/items", { params })
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [searchValue, dispatch]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = SORT_OPTIONS.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;

      
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  const skeletons = React.useMemo(
    () => EMPTY_SKELETONS.map((_, index) => <Skeleton key={index} />),
    []
  );

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {isLoading ? (
        <div className="content__items">{skeletons}</div>
      ) : items.length === 0 ? (
        <NotFoundItems />
      ) : (
        <div className="content__items">{pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
