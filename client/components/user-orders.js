import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserOrder = (props) => {
  const { orders, user } = props
  const { name, email } = user
  console.log(orders)
  return (
    <div id="user-orders">
      <h2>Welcome {name}</h2>

      <h3> Your Orders: </h3>
      {
        orders.map(order => {
          return (
            <div key={order.id} className="user-order">
              <h4>Order ID #{order.id}</h4>
              <h4>Status: {order.statusName}</h4>
              <h4>Items: </h4>
                {
                  order.purchasedItems.map(pI => {
                    return (
                      <div key={pI.id} className="purchase-item">
                      <NavLink to={`product-list/${pI.itemId}`}>
                      {pI.item.name}
                      </NavLink>
                        <p> Quantity: {pI.purchaseQuantity}</p>
                        <p> Purchase Price: {pI.purchasePriceDollars}</p>
                      </div>
                    )
                  })
                }
              <h4> Sub Total: {order.totalPrice} </h4>
              <h4> Order Time: {order.createdAt} </h4>
            </div>
          )
        })
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  const user = state.user;

  const orders = state.orders.filter(order => {
    return order.userId === user.id
  })
  return {
    user,
    orders
  }
}

export default connect(mapState)(UserOrder)

