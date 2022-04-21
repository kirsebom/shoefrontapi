import SecondNavigation from "../partials/SecondNavigation";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../../style/pages/Shop.module.css";
import { PRODUCT_URL } from "../../constants/api";
import { Link } from "react-router-dom";
import Footer from "../partials/Footer";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

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
						"An error occured while trying to fetch the products.. Reload and try again"
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
				<SecondNavigation />
				<div className={styles.error_container}>{error}</div>
			</>
		);
	}

	if (loading) {
		return (
			<>
				<SecondNavigation />
				<div className={styles.loader_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.shop_title}>Shop</h1>

				<div className={styles.product_container}>
					{products.map(function (product) {
						return (
							<>
								<Link
									className={styles.product_card}
									to={`/shop/${product.id}`}
									key={product.id}
								>
									<img
										src={product.images[0].src}
										className={styles.image}
										alt={product.images[0].alt}
									/>
									<h2 className={styles.title}>{product.name}</h2>
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

export default Shop;
