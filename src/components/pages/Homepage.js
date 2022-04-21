import { useEffect, useState } from "react";
import MainNavigation from "../partials/MainNavigation";
import styles from "../../style/pages/Homepage.module.css";
import Footer from "../partials/Footer";
import { PRODUCT_URL } from "../../constants/api";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
	let navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(null);
	const [featuredProducts, setFeaturedProducts] = useState([]);

	useEffect(function () {
		async function fetchFeaturedProducts() {
			try {
				const response = await fetch(PRODUCT_URL);
				if (response.ok) {
					const json = await response.json();
					console.log(json.length);
					console.log(json);
					let featuredArray = [];
					json.map(function (json) {
						console.log(json.categories);
						if (json.categories.length > 0) {
							console.log(json);
							return featuredArray.push(json);
						}
						console.log("Featured array: ", featuredArray);
					});
					setFeaturedProducts(featuredArray);
				} else {
					setError("An error occured while trying to fetch featured products");
				}
			} catch (error) {
				setError(toString(error));
			} finally {
				setLoading(false);
			}
		}
		fetchFeaturedProducts();
	}, []);

	// if (error) {
	// 	return <div className={styles.error_container}>{error}</div>;
	// }
	if (loading) {
		return (
			<>
				<div className={styles.wrapper}>
					<div className={styles.container}>
						<MainNavigation />
						<div className={styles.content}>
							<p className={styles.content_header}>
								Looking for the newest trends in the shoe world?
							</p>
							<p>You`re in the right place</p>
							<div className={styles.button_container}>
								<button onClick={handleClick} className={styles.button}>
									Visit shop
								</button>
								<div className={styles.button_background}></div>
							</div>
						</div>
						<div className={styles.loader_container}>
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	function handleClick() {
		navigate("/shop");
	}
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<MainNavigation />
					<div className={styles.content}>
						<p className={styles.content_header}>
							Looking for the newest trends in the shoe world?
						</p>
						<p>You`re in the right place</p>
						<div className={styles.button_container}>
							<button onClick={handleClick} className={styles.button}>
								Visit Shop
							</button>
							<div className={styles.button_background}></div>
						</div>
					</div>
				</div>
				<h2 className={styles.title}>Featured Products</h2>
				<div className={styles.featured_products_container}>
					{featuredProducts.map(function (product) {
						return (
							<>
								<Link
									key={product.id}
									className={styles.card}
									to={`/shop/${product.id}`}
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

export default Homepage;
