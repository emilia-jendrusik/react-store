import { useContext } from 'react'
import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart.context'

const CartDropdown = () => {
	const {cartItems} = useContext(CartContext);
	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'></div>
				{cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
			<Button>Go to checkout</Button>
		</div>
	)
}

export default CartDropdown