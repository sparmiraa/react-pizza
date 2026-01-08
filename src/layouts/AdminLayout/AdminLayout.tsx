import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectUser, selectUserStatus } from "../../redux/user/userSelectors";
import { isAdmin } from "../../utils/isAdmin";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import styles from "./AdminLayout.module.scss";
import { useState } from "react";

export default function AdminLayout() {
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectUserStatus);
  const [collapsed, setCollapsed] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin(user.roles)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.wrapperAdmin}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <main className={styles.adminContent}>
        <Outlet />
      </main>
    </div>
  );
}
