import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'

import './cart-icon.styles.scss'

const CartIcon = () => {
	const { cartVisible, setCartVisible, itemsQuantity } = useContext(CartContext);
		return (
			<div className='cart-icon-container' onClick={() => setCartVisible(!cartVisible)}>
				<ShoppingIcon className='shopping-icon' />
				<span className='item-count'>{itemsQuantity}</span>
			</div>
	)
}

export default CartIcon;