import { useState, useContext, Fragment } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/CartContext';
import Checkout from './Checkout';
import classes from './Cart.module.css';

const Cart = props => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [isCheckout, setIsCheckout] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	
	const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id)
	}
	
	const cartItemAddHandler = item => {
		cartCtx.addItem({...item, amount: 1})
	}

	const orderHandler = () => {
		setIsCheckout(true);
	}

	const modalAction = <div className={classes.actions}>
			<button className={classes.button__alt} onClick={props.onClose} >Close</button>
			{hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
		</div>

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch('https://react-food-app-f788b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items
			})
		})
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	}

	const cartItems = <ul className={classes.cartItems}>
	{cartCtx.items.map((item) => 
		<CartItem 	key={item.id} 
					name={item.name} 
					amount={item.amount} 
					price={item.price} 
					onRemove={cartItemRemoveHandler.bind(null, item.id)} 
					onAdd={cartItemAddHandler.bind(null, item)} /> )}
		</ul>
	
	const cartModalContent = (<Fragment>
		{cartItems}
		<div className={classes.total}>
			<span>Total Amount</span>
			<span>{totalAmount}</span>
		</div>
		{isCheckout && <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />}
		{!isCheckout && modalAction}
	</Fragment>
	)

	const isSubmittingCartModalContent = <p>Sending order data....</p>

	const didSubmitModalContent = <Fragment>
	<p>Succesfully sent the order...</p>
	 <div className={classes.actions}>
			<button className={classes.button} onClick={props.onClose} >Close</button>
		</div>
	</Fragment>

	return <Modal onClose={props.onClose}>
		{!isSubmitting && !didSubmit && cartModalContent}
		{isSubmitting && isSubmittingCartModalContent}
		{!isSubmitting && didSubmit && didSubmitModalContent}	
	</Modal>
	
}

export default Cart;