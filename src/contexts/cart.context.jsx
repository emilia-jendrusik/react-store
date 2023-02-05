import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext({
	cartVisible: null,
	setCartVisible: () => null
})

export const CartProvider = ({children}) => {
	const [cartVisible, setCartVisible] = useState(null);
	const value = {
		cartVisible,
		setCartVisible
	}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}