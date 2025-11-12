import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import {Routes, Route} from "react-router-dom";
import {cssTransition, ToastContainer} from "react-toastify";

import React from "react";


export default function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        theme="dark"
        limit={2}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
        toastClassName="toast-item"
        className="toast-container"
      />
    </div>
  );
}
