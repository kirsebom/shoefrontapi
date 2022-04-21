import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [favs, setFavs] = useLocalStorage("Favs", []);

	return (
		<CartContext.Provider value={[favs, setFavs]}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
