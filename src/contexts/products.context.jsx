import { createContext, useState, useEffect } from 'react'
import SHOP_DATA from '../shop-data.json'
import { onAuthStateChangeListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

export const ProductsContext = createContext({
	productsList: [],
	setProductsList: () => null
})

export const ProductsProvider = ({children}) => {
	const [productsList, setProductsList] = useState(SHOP_DATA);
	const value = {
		productsList,
		setProductsList
	}
	useEffect(() => {
		/*const unsubscribe = onAuthStateChangeListener((user) => {
			if(user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		})
		return unsubscribe*/
	}, [])
	return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}