import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { getCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function MainLayout() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
