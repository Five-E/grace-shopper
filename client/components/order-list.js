import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const OrderList = (props) => {
  const orders = props.orders

  if(!orders) return (<div id="warning"> The Rock can't cook up orders because we don't have any orders to cook. Get some people to buy rocks. </div>)

  return (
    <div>
      <h3>Orders List Page</h3>
      {
        orders.map(order => {
          return (
            <Link key={order.id} to={`/order-list/${order.id}`}><div id="order-box" style={{margin: '10px', padding: '15px', border: 'solid 1px black'}} >
              <span style={{fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px'}}>order id</span>
              {order.id}
              <span style={{fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px'}}>order by</span>
              {order.user.name}
              <span style={{fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px'}}>order date</span>
              {order.createdAt}
              <span style={{fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px'}}>order total paid</span>
              {order.totalPrice}
              <span style={{fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px'}}>order item count</span>
              {order.itemQuantity}
              <span style={{fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px'}}>order state</span>
              {order.statusName}
            </div></Link>
          )
        })
      }
    </div>
  )
}

const mapState = (state) => {
  return {
    orders: state.orders
  }
}

export default connect(mapState)(OrderList)
