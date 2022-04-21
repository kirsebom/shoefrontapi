import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCT_URL, UPDATE_URL } from "../../../constants/api";
import AppContext from "../../context/AppContext";
import SecondNavigation from "../../partials/SecondNavigation";
import Footer from "../../partials/Footer";
import styles from "../../../style/pages/adminpages/EditSpecificProduct.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "react-bootstrap/Spinner";
import { renderMarkup } from "react-render-markup";

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

const EditSpecificProduct = () => {
	const [error, setError] = useState(null);
	const [specificProduct, setSpecificProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useContext(AppContext);
	const [showDetails, setShowDetails] = useState(false);
	const [description, setDescription] = useState("");

	let navigate = useNavigate();

	const { id } = useParams();
	if (!id) {
		navigate("/admin/edit-product");
	}
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

	const url = PRODUCT_URL + "/" + id;
	const updateUrl = UPDATE_URL + id;

	useEffect(function () {
		async function fetchSpecificProduct() {
			try {
				const response = await fetch(url);
				if (response.ok) {
					const json = await response.json();
					console.log(json);
					setSpecificProduct(json);
					setDescription(renderMarkup(json.description));
				} else {
					setError(
						"That`s embarrassing, we couldent fetch the product you want to edit..Please try again"
					);
				}
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchSpecificProduct();
	}, []);

	function onSubmit(data) {
		setShowDetails(false);
		setLoading(true);
		console.log("data, ", data);
		if (data.featured === "Featured") {
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

			async function editProduct() {
				try {
					const response = await fetch(updateUrl, {
						method: "PUT",
						body: newData,
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${token.token}`,
						},
					});
					if (response.ok) {
						const json = await response.json();
						console.log(json);
						window.alert("Product was updated");
					} else {
						setError("Couldent update product, plis try again");
					}
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			editProduct();
		}
		if (data.featured === "Not Featured") {
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
				categories: [],
			});

			async function editProduct() {
				try {
					const response = await fetch(updateUrl, {
						method: "PUT",
						body: newData,
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${token.token}`,
						},
					});
					if (response.ok) {
						const json = await response.json();
						console.log(json);
						window.alert("Product was updated");
					} else {
						setError("Couldent update product, plis try again");
					}
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			editProduct();
		}
	}

	function currentProductDetails() {
		console.log("clicked");
		setShowDetails(true);
	}
	function hideCurrentProductDetails() {
		setShowDetails(false);
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
	if (showDetails) {
		return (
			<>
				<div className={styles.wrapper}>
					<SecondNavigation />
					<div className={styles.current_product_details}>
						<p>Current product name: {specificProduct.name}</p>
						<p>Current product price: {specificProduct.prices.price}</p>
						<p>Current image url: {specificProduct.images[0].src}</p>
						<p>Current description: {description}</p>
						{specificProduct.categories.length > 0 ? (
							<p>This product is featured on the homepage</p>
						) : (
							<p>This product is not featured on the homepage</p>
						)}
						<button
							onClick={hideCurrentProductDetails}
							className={styles.button_hide}
						>
							Hide current product details
						</button>
					</div>

					<h1 className={styles.header}>Edit {specificProduct.name}</h1>

					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.input_container}>
							<input
								className={styles.input}
								name="productname"
								{...register("productname")}
							/>
							<label className={styles.label} htmlFor="productname">
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
								className={styles.input}
								name="price"
								{...register("price")}
							/>
							<label className={styles.label} htmlFor="price">
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
								className={styles.input}
								name="imageurl"
								{...register("imageurl")}
							/>
							<label className={styles.label} htmlFor="price">
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
						<button className={styles.button}>Edit Product</button>
					</form>
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<div className={styles.button_prev_container}>
					<button
						className={styles.button_prev}
						onClick={currentProductDetails}
					>
						Current Product Details
					</button>
				</div>

				<h1 className={styles.header}>Edit {specificProduct.name}</h1>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							name="productname"
							{...register("productname")}
						/>
						<label className={styles.label} htmlFor="productname">
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
							className={styles.input}
							name="price"
							{...register("price")}
						/>
						<label className={styles.label} htmlFor="price">
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
							className={styles.input}
							name="imageurl"
							{...register("imageurl")}
						/>
						<label className={styles.label} htmlFor="price">
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
					<button className={styles.button}>Edit Product</button>
				</form>
			</div>
			<Footer />
		</>
	);
};

export default EditSpecificProduct;
