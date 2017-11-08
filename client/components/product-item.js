import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

/**
 * COMPONENT
 */

export const ProductItem = (props) => {

	if (!props) return <div>Loading>... </div>
	const { name, picture, priceDollars, id, description, stock } = props.itemInfo
	let buttonStatus = props.quantityInCart >= stock

	const divStyle = buttonStatus ? {
		color: 'white',
		textShadow: '2px 2px black',
		fontWeight: 'bold',
		textAlign: 'right',
		backgroundImage: 'url(./images/crazyrock.png)',
		backgroundSize: 'contain',
		backrgoundrepeat: 'no-repeat',
		width: '100%'
	} : {}

	return (
		<div className="col-xs-18 col-sm-6 col-md-3">
			<div className="thumbnail">
				<NavLink to={`/product-list/${id}`}>
					<img src={picture} className="item-img" />
				</NavLink>
				<div className="caption">
					<NavLink to={`/product-list/${id}`}>
						<h3>{name}</h3>
					</NavLink>
					<p>{description}</p>
					<p>Price: ${priceDollars}</p>
					<button disabled={buttonStatus} onClick={(e) => {
						if (!props.quantityInCart || props.quantityInCart < stock) {
							props.addToCart(props.itemInfo, props.user)
							const updatedQuantity = props.quantityInCart || 1
							if (updatedQuantity + 1 > stock) {
								e.target.HTML = 'No more stock'
								buttonStatus = true
							}
						} else {
							e.target.HTML = 'No more stock'
							buttonStatus = true
						}
					}} className="btn btn-info btn-xs" style={divStyle}>{buttonStatus ? 'No more units in stock' : 'Add to Cart'}
					</button>
					<p>RATING_PLACE_HOLDER</p>
					{/* TODO: Conditionally render the rating button if user is logged in. */}
					<NavLink to={`/product-rating/${id}`} className="btn btn-info btn-xs" role="button">Rate this Product</NavLink>
				</div>
			</div>
		</div>
	)
}

const mapState = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapState, null)(ProductItem)
