import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login";
import Details from "./components/pages/Details";
import { AppProvider } from "./components/context/AppContext";
import { CartProvider } from "./components/context/CartContext";
import { SearchProvider } from "./components/context/SearchContext";
import Admin from "./components/pages/adminpages/Admin";
import AddProduct from "./components/pages/adminpages/AddProduct";
import EditProductMain from "./components/pages/adminpages/EditProductMain";
import EditSpecificProduct from "./components/pages/adminpages/EditSpecificProduct";
import Searchresults from "./components/pages/Searchresults";

function App() {
	return (
		<>
			<AppProvider>
				<CartProvider>
					<SearchProvider>
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/shop" element={<Shop />} />
							<Route path="/shop/:id" element={<Details />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/login" element={<Login />} />
							<Route path="/search-results" element={<Searchresults />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/admin/add-product" element={<AddProduct />} />
							<Route path="/admin/edit-product" element={<EditProductMain />} />
							<Route
								path="/admin/edit-product/:id"
								element={<EditSpecificProduct />}
							/>
						</Routes>
					</SearchProvider>
				</CartProvider>
			</AppProvider>
		</>
	);
}

export default App;
