import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Cart from './cart'
import { placeNewOrder } from '../store'

const OrderSuccess = (props) => {
  if (!props.user || !props.orders) return <div>Loading///</div>
    const order = props.orders.find((curr) => {
      return curr.id === parseInt(props.match.params.orderId)
    })
    if(!order) return <div>Loading///</div>

    const itemsPurchased = order.purchasedItems.map((item) => {
      return (<p key={item.id}> {item.purchaseQuantity}  x  {item.item.name} ({item.purchasePriceDollars}  per rock) </p>)
    })
    return (
      <div>
        <h1>Order Successfully Placed</h1>
        <h3>Thank You {order.user.name}</h3>
        <p style={{fontStyle: 'italic'}}>{order.user.isGuest ? 
          'You should know Dwayne can see that you are not a registered member of our site. Do yourself a favor and sign up!' : 
          'Your business has been keeping Dwayne alive. Thank you for being a registered user.'}
        </p>
        <div>
          For:<br />
          <b>Name</b> {order.user.name}<br />
          <b>Email</b> {order.user.email}<br />
          <b>Street</b> {order.user.street}<br />
          <b>State</b> {order.user.state}<br />
          <b>Zip</b> {order.user.zip}<br />
          <b></b> <br />
        </div>
        <hr />
        <div>
          <b>Order Total</b> {order.totalPrice}<br />
          <b>Item Count</b> {order.purchasedItems.reduce((accum, item)=>{
            return accum + item.purchaseQuantity
          },0)}
        </div>
        <hr />
        <div>
          <b>Purchased Items</b><br />
          {itemsPurchased}
        </div>
      </div>)
}

const mapState = (state) => {
  return {
    orders: state.orders,
    user: state.user,
    cart: state.cart,
    items: state.items
  }
}

const mapDispatch = (dispatch) => ({
  goPlaceARockOrder(userInfo, products) {
    return dispatch(placeNewOrder(userInfo, products))
  }
})

export default connect(mapState, mapDispatch)(OrderSuccess)
