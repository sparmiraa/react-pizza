import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import NotFoundItems from "../components/NotFoundItems/NotFoundItems";
import { SearchContext } from "../App";

const EMPTY_SKELETONS = [...new Array(4)];
const PAGE_LIMIT = 4;

export default function Home() {
  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://690399efd0f10a340b250ab6.mockapi.io/items?page=${currentPage}&limit=${PAGE_LIMIT}&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => (res.ok ? res.json() : []))
      .then((arr) => setItems(arr))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  const skeletons = React.useMemo(
    () => EMPTY_SKELETONS.map((_, index) => <Skeleton key={index} />),
    []
  );

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => setCategoryId(index)}
        />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {isLoading ? (
        <div className="content__items">{skeletons}</div>
      ) : items.length === 0 ? (
        <NotFoundItems />
      ) : (
        <div className="content__items">{pizzas}</div>
      )}

      <Pagination
        value={currentPage}
        onChangePage={(number) => setCurrentPage(number)}
      />
    </div>
  );
}
