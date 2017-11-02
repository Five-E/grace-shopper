import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

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

			<form onSubmit={handleSubmit}>
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

function handleSubmit(event) {
	event.preventDefault();
}

function quantityDropdown(stock) {
	let options = [];
	for (let i = 1; i < stock + 1; i++) {
		options.push(i);
	}
	return options.map(idx => <option key={idx}>{idx}</option>);
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	//console.log('my state', state.items); 
	return {
		items: state.items
	}
}
const mapDispatch = (dispatch) => {
	return {
		addToCart: function (items) {
			//dispatch(OUR_THUNKER(items))
		}
	}
}

export default connect(mapState, mapDispatch)(SingleProductPage); 
