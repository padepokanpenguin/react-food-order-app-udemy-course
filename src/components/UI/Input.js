import React from 'react';

const Input = React.forwardRef((props, ref) => {
	return <div className="input">
		<label htmlFor={props.input.id} >{props.lable}</label>
		<input ref={ref} id={props.input.id} {...props.input} />
	</div>;
})

export default Input;