import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectUser, selectUserStatus } from "../redux/user/userSelectors";
import { isAdmin } from "../utils/isAdmin";

export default function AdminLayout() {
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectUserStatus);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin(user.roles)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}