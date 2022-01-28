import CartContext from './CartContext';

const CartProvider = props => {
	const addItemCartHandler = item => {}

	const removeItemCartHandler = id => {}


	const cartContext = {
		item: [],
		totalAmount: 0,
		addItem: addItemCartHandler,
		removeItem: removeItemCartHandler 
	};

	return <CartContext.Provider value={cartContext}>
		{props.children}
	</CartContext.Provider>
}

export default CartProvider;