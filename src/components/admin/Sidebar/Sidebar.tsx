import { NavLink } from "react-router-dom";
import { adminRoutes } from "../../../config/adminRoutes";
import styles from "./Sidebar.module.scss";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SidebarProps } from "./SidebarTypes";
import classNames from "classnames";

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={classNames(styles.adminSidebar, {
        [styles.collapsed]: isCollapsed,
      })}
    >
      <div className={styles.sidebarHeader}>
        <h2
          className={classNames(styles.sidebarTitle, {
            [styles.collapsed]: isCollapsed,
          })}
        >
          Admin Panel
        </h2>

        <button className={styles.collapseBtn} onClick={onToggle}>
          {isCollapsed ? (
            <FiChevronRight size={18} />
          ) : (
            <FiChevronLeft size={18} />
          )}
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        {adminRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              classNames(styles.navItem, {
                [styles.active]: isActive,
              })
            }
          >
            <span className={styles.icon}>{route.icon}</span>
            <span
              className={classNames(styles.label, {
                [styles.collapsed]: isCollapsed,
              })}
            >
              {route.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
