import {useContext} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';

const HeaderCartBtn = props => {
	const cartCtx = useContext(CartContext)

	const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);

	return <button className="button" onClick={props.onClick} >
		<span className="icon">
			<CartIcon />
		</span>
		<span>Your Cart</span>
		<span className="badge">{numberOfCartItems}</span>
	</button>

}

export default HeaderCartBtn;