import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/slices/filterSlice'


import React from "react";

export const SearchContext = React.createContext("");

export default function App() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
              <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider> */}
    </div>
  );
}
