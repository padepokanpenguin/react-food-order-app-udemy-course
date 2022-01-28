import {Fragment} from 'react';
import mealsImg from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
	return <Fragment>
		<header className="header">
			<h1>React Meals</h1>
			<HeaderCartButton onClick={props.onShowCart} />
		</header>
		<div className="main-image">
			<img src={mealsImg} alt="A table full of delicious food" />
		</div>
	</Fragment>
}

export default Header;