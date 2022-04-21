import SecondNavigation from "../partials/SecondNavigation";
import Footer from "../partials/Footer";
import styles from "../../style/pages/Cart.module.css";
import { useContext, useState, useEffect } from "react";
import CartContext from "../context/CartContext";
import { PRODUCT_URL } from "../../constants/api";

const Cart = () => {
	const [favs, setFavs] = useContext(CartContext);
	const [sum, setSum] = useState("");

	useEffect(function () {
		if (favs.length > 0) {
			let sum = 0;
			for (let i = 0; favs.length > i; i++) {
				sum += JSON.parse(favs[i].prices.price);
			}
			console.log("sum: ", sum);
			setSum(sum);
		}
	}, []);

	// const [products, setProducts] = useState([]);

	// useEffect(function () {
	// 	async function fetchProducts() {
	// 		try {
	// 			const response = await fetch(PRODUCT_URL);

	// 			const json = await response.json();
	// 			console.log(json);
	// 			setProducts(json);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	fetchProducts();
	// }, []);

	// function handleClick() {
	// 	console.log("clicked");
	// 	const newFavsList = favs.filter((fav) => fav.id !== products.id);
	// 	setFavs(newFavsList);
	// }
	function deleteCart() {
		if (window.confirm("Are you sure you want to empty your cart?")) {
			setFavs([]);
		}
	}
	function removeItem(id) {
		console.log(id);
		const newFavsList = favs.filter((fav) => fav.id !== id);
		console.log(newFavsList);
		setFavs(newFavsList);
		window.location.reload(true);
	}

	if (favs.length === 0) {
		return (
			<>
				<div className={styles.wrapper}>
					<SecondNavigation />
					<div className={styles.error_container}>
						<p className={styles.error_message}>Your cart is empty</p>
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
				<div className={styles.cart_container}>
					<div className={styles.empty_cart_container}>
						<button className={styles.delete_btn} onClick={deleteCart}>
							Empty Cart
						</button>
					</div>
					{favs.map(function (fav) {
						return (
							<div className={styles.cart_item} key={fav.id}>
								<div className={styles.item_container}>
									<img
										src={fav.images[0].src}
										alt={fav.images[0].alt}
										className={styles.image}
									/>
									<h2 className={styles.cart_item_header}>{fav.name}</h2>
									<p className={styles.cart_item_price}>{fav.prices.price}</p>
								</div>
								<button
									className={styles.button_remove}
									onClick={() => removeItem(fav.id)}
								>
									Remove Item
								</button>
							</div>
						);
					})}
				</div>
				<div className={styles.sum}>Your total is: {sum}NOK</div>
			</div>
			<Footer />
		</>
	);
};

export default Cart;
