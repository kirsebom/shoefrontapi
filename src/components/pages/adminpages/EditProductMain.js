import { useState, useEffect, useContext } from "react";
import { PRODUCT_URL } from "../../../constants/api";
import styles from "../../../style/pages/adminpages/EditProductMain.module.css";
import SecondNavigation from "../../partials/SecondNavigation";
import Footer from "../../partials/Footer";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const EditProductMain = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [products, setProducts] = useState([]);
	const [token, setToken] = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});

	useEffect(function () {
		async function fetchProducts() {
			try {
				const response = await fetch(PRODUCT_URL);
				if (response.ok) {
					const json = await response.json();
					console.log(json);
					setProducts(json);
				} else {
					setError(
						"An error occured while trying to fetch the editable products"
					);
				}
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchProducts();
	}, []);

	if (error) {
		return (
			<>
				<div className={styles.wrapper}>
					<SecondNavigation />

					<div className={styles.error_container}>{error}</div>
				</div>
				<Footer />
			</>
		);
	}

	if (loading) {
		return (
			<>
				<div className={styles.wrapper}>
					<SecondNavigation />

					<div className={styles.loader_container}>
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />

				<h1 className={styles.header}>Pick which product to edit</h1>
				<div className={styles.product_container}>
					{products.map(function (product) {
						return (
							<>
								<Link
									className={styles.product_card}
									to={`/admin/edit-product/${product.id}`}
									key={product.id}
								>
									<img src={product.images[0].src} className={styles.image} />
									<h2 className={styles.product_title}>{product.name}</h2>
								</Link>
							</>
						);
					})}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default EditProductMain;
