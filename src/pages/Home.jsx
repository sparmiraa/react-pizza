import React from "react";
import { useSelector, useDispatch  } from "react-redux";
import { setCategoryId } from '../redux/slices/filterSlice'


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
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector(state => state.filter)
  
  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  React.useEffect(() => {
    setIsLoading(true);

    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
          onChangeCategory={onChangeCategory}
        />
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

      <Pagination
        value={currentPage}
        onChangePage={(number) => setCurrentPage(number)}
      />
    </div>
  );
}
