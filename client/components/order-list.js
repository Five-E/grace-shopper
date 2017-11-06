import React from 'react'

const OrderList = (props) => {

  const orders = props.orders

  return (
    <div>
      <h3>Orders List Page</h3>
      {
        orders ? orders.map(order => {
          return (
            <div id="order-box" style={{margin: '10px', padding: '15px', border: 'solid 1px black'}} key={order.id}>
              <span style={{fontWeight: 'bold', display: 'block'}}>order id</span>
              {order.id}
              <span style={{fontWeight: 'bold', display: 'block'}}>order by</span>
              {order.user.name}
              <span style={{fontWeight: 'bold', display: 'block'}}>order date</span>
              {order.createdAt}
              <span style={{fontWeight: 'bold', display: 'block'}}>order total paid</span>
              {order.totalPrice}
              <span style={{fontWeight: 'bold', display: 'block'}}>order item count</span>
              {order.itemQuantity}
            </div>
          )
        }) : (<div id="warning">
        The Rock can't cook up orders because we don't have any orders to cook. Get some people to buy rocks.
        </div>)
      }
    </div>
  )
}

export default OrderList
