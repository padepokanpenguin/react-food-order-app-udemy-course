import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/CartContext';

const MealItem = props => {
	const cartCtx = useContext(CartContext);
	const price = `$${props.price.toFixed(2)}`

	const addToCart = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price
		})
	}	

	return <li className="meal">
		<div>
		<h3>{props.name}</h3>
		<div className="description">{props.description}</div>
		<div className="price">{props.price}</div>
		</div>
		<div>
			<MealItemForm onAddToCart={addToCart} id={props.id}/>
		</div>
	</li>	
};

export default MealItem;