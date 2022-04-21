import SecondNavigation from "../../partials/SecondNavigation";
import Footer from "../../partials/Footer";
import styles from "../../../style/pages/adminpages/AddProduct.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
	productname: yup
		.string()
		.required("Enter product name")
		.min(3, "Product name must atleast be 3 charecters long"),
	price: yup.number().required("The price must be in number form"),
	description: yup
		.string()
		.required("Enter a description for the product")
		.min(25, "The description mist be atleast 25 characters long"),
	imageurl: yup
		.string()
		.url()
		.nullable()
		.required("Enter a online link to the image"),
	featured: yup.string().required(),
});

const AddProduct = () => {
	const [token, setToken] = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function onSubmit(data) {
		console.log("data: ", data);
		console.log(data.featured);
		if (data.featured === "Featured") {
			setLoading(true);
			const newData = JSON.stringify({
				name: data.productname,
				type: "simple",
				regular_price: `${data.price}`,
				description: data.description,
				images: [
					{
						src: data.imageurl,
						position: 0,
					},
				],
				categories: [
					{
						id: 17,
						name: "Featured",
						slug: "featured",
						link: "https://www.olemartinslekestue.no/api/product-category/featured/",
						position: 0,
					},
				],
			});

			async function addProduct() {
				try {
					const response = await fetch(
						"https://olemartinslekestue.no/api/wp-json/wc/v3/products",
						{
							method: "POST",
							body: newData,
							headers: {
								"Content-type": "application/json",
								Authorization: `Bearer ${token.token}`,
							},
						}
					);
					if (response.ok) {
						const json = await response.json();
						console.log(json);
						window.alert("Product was added succesfully");
					} else {
						setError("Couldent add product...Plis refresh and try agian");
					}
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			addProduct();
		}
		if (data.featured === "Not Featured") {
			setLoading(true);
			const newData = JSON.stringify({
				name: data.productname,
				type: "simple",
				regular_price: `${data.price}`,
				description: data.description,
				images: [
					{
						src: data.imageurl,
						position: 0,
					},
				],
			});

			async function addProduct() {
				try {
					const response = await fetch(
						"https://olemartinslekestue.no/api/wp-json/wc/v3/products",
						{
							method: "POST",
							body: newData,
							headers: {
								"Content-type": "application/json",
								Authorization: `Bearer ${token.token}`,
							},
						}
					);
					if (response.ok) {
						const json = await response.json();
						console.log(json);
						window.alert("Product was added succesfully");
					} else {
						setError("Couldent add product...Plis refresh and try agian");
					}
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			addProduct();
		}

		// 	setLoading(true);
		// const newData = JSON.stringify({
		// 	name: data.productname,
		// 	type: "simple",
		// 	regular_price: `${data.price}`,
		// 	description: data.description,
		// 	images: [
		// 		{
		// 			src: data.imageurl,
		// 			position: 0,
		// 		},
		// 	],
		// });

		// 		async function addProduct() {
		// 			try {
		// 				const response = await fetch(
		// 					"https://olemartinslekestue.no/api/wp-json/wc/v3/products",
		// 					{
		// 						method: "POST",
		// 						body: newData,
		// 						headers: {
		// 							"Content-type": "application/json",
		// 							Authorization: `Bearer ${token.token}`,
		// 						},
		// 					}
		// 				);
		// 				if (response.ok) {
		// 					const json = await response.json();
		// 					console.log(json);
		// 					window.alert("Product was added succesfully");
		// 				} else {
		// 					setError("Couldent add product...Plis refresh and try agian");
		// 				}
		// 			} catch (error) {
		// 				setError(error.toString());
		// 			} finally {
		// 				setLoading(false);
		// 			}
		// 		}
		// 		addProduct();
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

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.input_container}>
						<input
							name="productname"
							className={styles.input}
							{...register("productname")}
						/>
						<label htmlFor="productname" className={styles.label}>
							Product name
						</label>
					</div>
					{errors.productname && (
						<span className={styles.error_message}>
							{errors.productname.message}
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="price"
							className={styles.input}
							{...register("price")}
						/>
						<label htmlFor="price" className={styles.label}>
							Price
						</label>
					</div>
					{errors.price && (
						<span className={styles.error_message}>
							The price must be in form of a number
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="imageurl"
							className={styles.input}
							{...register("imageurl")}
						/>
						<label htmlFor="imageurl" className={styles.label}>
							Online image url
						</label>
					</div>
					{errors.imageurl && (
						<span className={styles.error_message}>
							{errors.imageurl.message}
						</span>
					)}
					<div className={styles.input_container}>
						<textarea
							name="description"
							className={styles.textarea}
							{...register("description")}
						/>
						<label htmlFor="description" className={styles.textarea_label}>
							Description
						</label>
					</div>
					{errors.description && (
						<span className={styles.error_message}>
							{errors.description.message}
						</span>
					)}
					<div className={styles.option_container}>
						<select {...register("featured")}>
							<option>Not Featured</option>
							<option>Featured</option>
						</select>
					</div>
					<button className={styles.button}>Add Product</button>
				</form>
			</div>
			<Footer />
		</>
	);
};

export default AddProduct;
