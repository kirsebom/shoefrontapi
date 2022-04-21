import styles from "../../style/partials/AdminNavigation.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
	return (
		<nav className={styles.nav}>
			<NavLink to="/admin/add-product" className={styles.nav_link}>
				Add Product
			</NavLink>
			<NavLink to="/admin/edit-product" className={styles.nav_link}>
				Edit Product
			</NavLink>
		</nav>
	);
};

export default AdminNavigation;
