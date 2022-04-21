import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCT_URL } from "../../constants/api";
import SecondNavigation from "../partials/SecondNavigation";
import styles from "../../style/pages/Details.module.css";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../partials/Footer";
import CartContext from "../context/CartContext";

const Details = () => {
	const [error, setError] = useState(null);
	const [productDetails, setProductDetails] = useState([]);
	const [loading, setLoading] = useState(true);
	const [favs, setFavs] = useContext(CartContext);

	let navigate = useNavigate();

	const { id } = useParams();
	if (!id) {
		navigate("/");
	}
	const url = PRODUCT_URL + "/" + id;

	useEffect(function () {
		async function fetchProductDetails() {
			try {
				const response = await fetch(url);
				if (response.ok) {
					const json = await response.json();
					console.log(json);
					setProductDetails(json);
				} else {
					setError(
						"That`s embarresing... We couldent find the product details. Plis try again"
					);
				}
			} catch (error) {
				setError(error.toString);
			} finally {
				setLoading(false);
			}
		}
		fetchProductDetails();
	}, []);

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
	if (error) {
		return (
			<>
				<SecondNavigation />
				<div className={styles.error_container}>{error}</div>
			</>
		);
	}
	const message = productDetails.description;
	function handleClick() {
		const newFavsList = [...favs, productDetails];
		setFavs(newFavsList);
		window.alert(`${productDetails.name} was added to your cart`);
	}
	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<div className={styles.details_container}>
					<div className={styles.image_container}>
						<img
							src={productDetails.images[0].src}
							alt={productDetails.images[0].alt}
							className={styles.image}
						/>
					</div>
					<div className={styles.product_details}>
						<div>
							<h1>{productDetails.name}</h1>
							<p>{productDetails.prices.price}</p>
						</div>
						<p dangerouslySetInnerHTML={{ __html: message }}></p>
						<button onClick={handleClick} className={styles.button}>
							Add to cart
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Details;
