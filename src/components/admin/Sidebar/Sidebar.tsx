import { NavLink } from "react-router-dom";
import { adminRoutes } from "../../../config/adminRoutes";
import styles from "./Sidebar.module.scss";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SidebarProps } from "./SidebarTypes";


export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`${styles.adminSidebar} ${
        collapsed ? styles.collapsed : ""
      }`}
    >
      <div className={styles.sidebarHeader}>
        {!collapsed && (
          <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        )}

        <button
          className={styles.collapseBtn}
          onClick={onToggle}
        >
          {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        {adminRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              isActive
                ? `${styles.navItem} ${styles.active}`
                : styles.navItem
            }
          >
            <span className={styles.icon}>{route.icon}</span>
            {!collapsed && <span>{route.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
