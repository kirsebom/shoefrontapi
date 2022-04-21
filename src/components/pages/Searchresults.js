import { useEffect, useState, useContext } from "react";
import SearchContext from "../context/SearchContext";
import SecondNavigation from "../partials/SecondNavigation";
import Footer from "../partials/Footer";
import styles from "../../style/pages/Searchresults.module.css";
import { Link } from "react-router-dom";

const Searchresults = () => {
	const [results, setResults] = useContext(SearchContext);

	useEffect(function () {
		console.log(results);
	});
	if (results.length === 0) {
		return (
			<>
				<div className={styles.wrapper}>
					<SecondNavigation />
					<div className={styles.error_message}>
						We couldent find any products matching your search..Plis try again!
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
				<div className={styles.product_container}>
					{results.map(function (product) {
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

export default Searchresults;
