import styles from "../../../style/pages/adminpages/Admin.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import SecondNavigation from "../../partials/SecondNavigation";

import Footer from "../../partials/Footer";

const Admin = () => {
	const [token, setToken] = useContext(AppContext);
	const navigate = useNavigate();
	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />

				<div className={styles.container}>
					<p className={styles.text}>
						You are now logged in to the adminpanel on Shoefront. You can now
						use the adminpanel below the navigation freely
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Admin;
