import "./scss/app.scss";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";

import GetMeLayout from "./layouts/GetMeLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<GetMeLayout />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Route>
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
