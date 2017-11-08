import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */

export const ProductItem = (props) => {

	if (!props) return <div>Loading>... </div>
	const { name, picture, priceDollars, id, description, stock } = props.itemInfo
	let buttonStatus
	if (stock === 0 || props.quantityInCart >= stock) {
		buttonStatus = true
	} else {
		buttonStatus = false
	}
	const divStyle = buttonStatus ? {
		color: 'white',
		textShadow: '2px 2px black',
		fontWeight: 'bold',
		textAlign:'right',
		backgroundImage: 'url(./images/crazyrock.png)',
		backgroundSize: 'contain',
		backrgoundrepeat: 'no-repeat',
		width: '100%'
	} : {}
	return (
		<div className="col-xs-18 col-sm-6 col-md-3">
			<div className="thumbnail">
				<Link to={`/product-list/${id}`}>
					<img src={picture} className="item-img" />
				</Link>
				<div className="caption">
					<Link to={`/product-list/${id}`}>
						<h3>{name}</h3>
					</Link>
					<p>{description}</p>
					<p>Price: {priceDollars}</p>
					<p>In Stock: {stock} {props.quantityInCart >= 1 && ` | ${props.quantityInCart} in cart`}</p>
					<button
					disabled={buttonStatus} onClick={(e) => {
						if (!props.quantityInCart || props.quantityInCart < stock ) {
							props.addToCart(props.itemInfo, props.user, props.cart)
							const updatedQuantity = props.quantityInCart || 1
							if (updatedQuantity + 1 > stock) {
								buttonStatus = true
							}
						} else {
							buttonStatus = true
						}
					}} className="btn btn-info btn-xl" style={divStyle}>
					{buttonStatus ? 'No more rock... in stock' : 'Add to Cart'}
					</button>
				</div>
			</div>
		</div>
	)
}

const mapState = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapState, null)(ProductItem)
