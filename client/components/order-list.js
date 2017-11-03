import React from 'react'
import { connect } from 'react-redux'


const OrderList = (props) => {

  const orders = props.orders;

  return (
    <div>
      <h3>Orders List Page</h3>
      {
        orders.map(order => {
          return (
            <div style={{ margin: '10px', padding: '15px', border: 'solid 1px black' }} key={order.id}>
              <span style={{ fontWeight: 'bold', display: 'block' }}>order id</span>
              {order.id}
              <span style={{ fontWeight: 'bold', display: 'block' }}>order by</span>
              {order.user.name}
              <span style={{ fontWeight: 'bold', display: 'block' }}>order date</span>
              {order.createdAt}
              <span style={{ fontWeight: 'bold', display: 'block' }}>order total paid</span>
              {order.totalPrice}
              <span style={{ fontWeight: 'bold', display: 'block' }}>order item count</span>
              {order.itemQuantity}
            </div>
          )
        })
      }
    </div>
  )
}

const mapState = (state) => {
  return { orders: state.orders }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(OrderList)
