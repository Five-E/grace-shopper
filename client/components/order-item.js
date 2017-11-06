import React from 'react'
import { connect } from 'react-redux'
import PurchasedItems from './purchased-items'
import { Link } from 'react-router-dom'


const OrderItem = (props) => {
	console.log(props.match.params.orderId)

	if (!props.orders) {
		return <div>Loading>... </div>
	} else {
		const order = props.orders.find((checking) => {
			return checking.id === parseInt(props.match.params.orderId)
		})
		if (!order) return <div>invalid order id</div>
		return (
			<div>
				<Link to={`/order-list/edit/${order.id}`}>Edit This Order</Link> | <Link to={`/order-list/`}>View All Orders</Link>
				<h1>Order #{order.id} Details</h1>
				<h4>Status: {order.statusName}</h4>
				
				<b>ordered by:</b> {order.user.name}<br />
				<b>order date:</b> {order.createdAt}<br />
				<b>ordered item quantity:</b> {order.itemQuantity}<br />
				<b>order total:</b> {order.totalPrice}<br />
				<PurchasedItems purchasedItems={order.purchasedItems} />
			</div>)
	}
}

const mapState = (state) => {

	return {
	  isLoggedIn: !!state.user.id,
	  orders: state.orders
	}
  }
  
  const mapDispatch = (dispatch) => {
	return {

	}
  }
  
  export default connect(mapState, mapDispatch)(OrderItem)
  
