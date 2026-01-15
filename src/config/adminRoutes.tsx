import { CiPizza } from "react-icons/ci";
import { FiChevronLeft } from "react-icons/fi";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    label: "Pizzas",
    icon: <CiPizza />,
  },
  {
    path: "/",
    label: "Main page",
    icon: <FiChevronLeft />,
  },
];