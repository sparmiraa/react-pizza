import "./scss/app.scss";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";


import MainLayout from "./layouts/MainLayout.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

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
    </>
  );
}
