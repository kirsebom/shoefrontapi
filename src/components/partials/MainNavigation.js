import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../style/partials/MainNavigation.module.css";
import logo from "../../assets/logo.png";
import AdminNavigation from "./AdminNavigation";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import SearchBox from "./SearchBox";

const MainNavigation = () => {
	const [token, setToken] = useContext(AppContext);

	const navigate = useNavigate();
	function logout() {
		if (window.confirm("Are you sure you want to logout?")) {
			setToken(null);
			navigate("/login");
		}
	}
	return (
		<>
			<nav className={styles.nav}>
				<div className={styles.container}>
					<NavLink to="/">
						<img className={styles.logo} src={logo} alt="Shoefront logo" />
					</NavLink>
					<div className={styles.nav_middle}>
						<NavLink to="/shop" className={styles.nav_link}>
							Shop
						</NavLink>
						<NavLink to="/cart" className={styles.nav_link}>
							Cart
						</NavLink>
					</div>

					{token ? (
						<>
							<button className={styles.logout_button} onClick={logout}>
								Logout
							</button>
						</>
					) : (
						<NavLink
							to="/login"
							className={`${styles.nav_link} ${styles.login_link}`}
						>
							Login
						</NavLink>
					)}
				</div>
			</nav>
			{token ? (
				<>
					<AdminNavigation />
				</>
			) : (
				<></>
			)}
			<SearchBox />
		</>
	);
};

export default MainNavigation;
