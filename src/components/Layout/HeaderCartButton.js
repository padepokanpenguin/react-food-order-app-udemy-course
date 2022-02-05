import {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';

const HeaderCartBtn = props => {
	const [btnIsHighlighted, setBtnIsHighLighted] = useState(false);
	const cartCtx = useContext(CartContext)

	const {items} = cartCtx;

	const numberOfCartItems = items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);

	const btnAnimation = `${btnIsHighlighted ? 'button bump' : 'button'}`

	useEffect(() => {
		if (items.length === 0){
			return;
		}

		setBtnIsHighLighted(true)

		const timer = setTimeout(() => {
			setBtnIsHighLighted(false)
		}, 300)

		return () => {
			clearTimeout(timer)
		}
	}, [items])

	return <button className={btnAnimation} onClick={props.onClick} >
		<span className="icon">
			<CartIcon />
		</span>
		<span>Your Cart</span>
		<span className="badge">{numberOfCartItems}</span>
	</button>

}

export default HeaderCartBtn;