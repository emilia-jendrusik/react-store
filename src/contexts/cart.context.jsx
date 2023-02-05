import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, productToAdd) => {
	let existingItem = cartItems.find((item) => item.id === productToAdd.id);
	if(existingItem) {
		return cartItems.map((item) => {
			if(item.id === productToAdd.id) {
				return {...item, quantity: item.quantity + 1}
			} else {
				return item
			}
		})
	
	} else {
		return [...cartItems, {...productToAdd, quantity: 1}]
	}

}

export const CartContext = createContext({
	cartVisible: null,
	setCartVisible: () => null,
	cartItems: [],
	addItemToCart: () => null,
	itemsQuantity: 0
})

export const CartProvider = ({children}) => {
	const [cartVisible, setCartVisible] = useState(null);
	const [cartItems, setCartItems] = useState([]);
	const [itemsQuantity, setItemsQuantity] = useState(0);
	useEffect(() => {
		const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setItemsQuantity(newCartQuantity);
	}, [cartItems])
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	}
	const value = {
		cartVisible,
		setCartVisible,
		cartItems,
		addItemToCart,
		itemsQuantity
	}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}