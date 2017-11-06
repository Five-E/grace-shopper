import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const OrderItemEdit = (props) => {
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
				<Link to={`/order-list/${order.id}`}>View This Order</Link> | <Link to={`/order-list/`}>View All Orders</Link>
				<h1>Edit Order #{order.id}</h1>
				
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
  
  export default connect(mapState, mapDispatch)(OrderItemEdit)
  
