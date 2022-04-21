import styles from "../../style/partials/SearchBox.module.css";
import { useState, useEffect, useContext } from "react";
import SearchContext from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { PRODUCT_URL } from "../../constants/api";

const SearchBox = () => {
	const navigate = useNavigate();
	const [results, setResults] = useContext(SearchContext);
	const [text, setText] = useState("");
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");

	useEffect(function () {
		async function fetchProducts() {
			try {
				const response = await fetch(PRODUCT_URL);
				const json = await response.json();
				console.log(json);
				setProducts(json);
			} catch (error) {
				console.log(error);
			}
		}
		fetchProducts();
	}, []);

	const onChangeHandler = (text) => {
		console.log(text);
		setText(text);
		if (text.length > 0) {
			setError("");
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("text", text);
		if (text.length > 0) {
			const filteredProducts = products.filter(function (product) {
				if (product.name.toLowerCase().startsWith(text.toLowerCase())) {
					return true;
				}
			});
			setResults(filteredProducts);
			navigate("/search-results");
		} else {
			setError("Enter a searchvalue");
		}
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				<input
					placeholder="Search for booking"
					onChange={(e) => onChangeHandler(e.target.value)}
					className={styles.input}
				/>

				<button className={styles.button}>Search</button>
			</form>
			<span className={styles.error_message}>{error}</span>
		</>
	);
};

export default SearchBox;
