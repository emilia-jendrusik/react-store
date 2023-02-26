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

const deleteCartItem = (cartItems, productToDelete) => {
	return cartItems.filter((item) => item.id === productToDelete.id ?  false : true)
}

const removeCartItem = (cartItems, productToRemove) => {
	if(productToRemove.quantity === 1) {
		return deleteCartItem(cartItems, productToRemove)
	}
	return cartItems.map((item) => {
		if(item.id === productToRemove.id) {
			return {...item, quantity: item.quantity - 1}
		}
		return item
	})

}

export const CartContext = createContext({
	cartVisible: null,
	setCartVisible: () => null,
	cartItems: [],
	addItemToCart: () => null,
	removeItemFromCart: () => null,
	itemsQuantity: 0,
	totalPrice: 0
})

export const CartProvider = ({children}) => {
	const [cartVisible, setCartVisible] = useState(null);
	const [cartItems, setCartItems] = useState([]);
	const [itemsQuantity, setItemsQuantity] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	
	useEffect(() => {
		const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		const newCartPrice = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0);
		setItemsQuantity(newCartQuantity);
		setTotalPrice(newCartPrice);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	}
	const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
	}
	const deleteItemFromCart = (productToDelete) => {
		setCartItems(deleteCartItem(cartItems, productToDelete));
	}
	const value = {
		cartVisible,
		setCartVisible,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		deleteItemFromCart,
		itemsQuantity,
		totalPrice
	}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}