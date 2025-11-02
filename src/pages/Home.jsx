import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

export default function Home() {
 const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://690399efd0f10a340b250ab6.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);
    return(
  <>
    <div className="content__top">
      <Categories />
      <Sort />
    </div>

    <h2 className="content__title">Все пиццы</h2>

    <div className="content__items">
      {isLoading
        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
        : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
    </div>
  </>
    )
}
