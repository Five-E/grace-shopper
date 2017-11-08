import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { putItemInCart } from '../store'
import ReviewList from './review-list'

/**
 * COMPONENT
 */
export const SingleProductPage = (props) => {

	const id = props.match.params.itemsId,
		targetItem = props.items.find(item => item.id === +id);

	if (!targetItem) return <div>Loading...</div>;

	const { name, picture, priceDollars, stock, description } = targetItem
	let buttonStatus = props.cart[id] >= stock

	const divStyle = buttonStatus ? {
		color: 'white',
		textShadow: '2px 2px black',
		fontWeight: 'bold',
		textAlign: 'right',
		backgroundImage: 'url(../images/crazyrock.png)',
		backgroundSize: 'contain',
		backrgoundrepeat: 'no-repeat',
		width: '100%'
	} : {}

	return (
		<div>
			<img height="200px" src={picture} />
			<h3>{name}</h3>
			<p>Description: {description}</p>
			<p>Price:       {priceDollars}</p>
			<p>In Stock:    {stock}</p>

			<button disabled={buttonStatus} onClick={(e) => {
				e.preventDefault()
				if (!props.cart[id] || props.cart[id] < stock) {
					props.addToCart({ id: targetItem.id }, props.user)
					const updatedQuantity = props.cart[id] || 1
					if (updatedQuantity + 1 > stock) {
						buttonStatus = true
					}
				} else {
					buttonStatus = true
				}
			}} className="btn btn-info btn-xs" style={divStyle}>{buttonStatus ? 'No more units in stock' : 'Add to Cart'}</button> {props.cart[id] >= 1 && `${props.cart[id]} in cart`}

			<button><NavLink to={`/product-list`}>Return to List</NavLink></button>
			<ReviewList name={name} productId={+id} />
		</div>
	);
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		items: state.items,
		user: state.user,
		cart: state.cart
	}
}

const mapDispatch = (dispatch) => {
	return {
		addToCart(item, user) {
			dispatch(putItemInCart(item, user))
		}
	}
}

export default connect(mapState, mapDispatch)(SingleProductPage);
