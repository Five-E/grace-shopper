import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addToCart } from '../store'

/**
 * COMPONENT
 */
export const SingleProductPage = (props) => {

	const id = props.match.params.itemsId,
		targetItem = props.items.find(item => item.id === +id);

	if (!targetItem) return <div>Loading...</div>;

	const { name, picture, price, stock, description } = targetItem;

	return (
		<div>
			<img src={picture} />
			<h3>{name}</h3>
			<p>Description: {description}</p>
			<p>Price:       ${price}</p>
			<p>In Stock:    {stock}</p>

			<form value={targetItem} onSubmit={props.handleSubmit}>
				<select>
					{quantityDropdown(stock)}
				</select>
				<button>Add to Cart</button>
			</form>

			<button><NavLink to={`/product-list`}>Return to List</NavLink></button>

			<h1>Reviews Placeholder</h1>
			{/* Create Reviews List component */}
		</div>
	);
}

function quantityDropdown(stock) {
	let options = [];
	for (let i = 1; i <= stock; i++) {
		options.push(i);
	}
	return options.map(idx => <option key={idx}>{idx}</option>);
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		items: state.items
	}
}
const mapDispatch = (dispatch) => {
	return {
		handleSubmit: (event) => {
			event.preventDefault();
			dispatch(addToCart(event.target.value));
		},

	}
}

export default connect(mapState, mapDispatch)(SingleProductPage);
