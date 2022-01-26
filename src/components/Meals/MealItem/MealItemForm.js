import Input from '../../UI/Input';

const MealItemForm = props => {
	return <form className="form">
			<Input lable="Amount" input={{
				id: 'amount' + props.id,
				type: 'number',
				min: '1',
				max: '5',
				defaultValue: '1'
			}} />
			<button>+ Add</button>
	</form>
};

export default MealItemForm;