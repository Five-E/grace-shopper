import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class OrderItemEdit extends Component {

  render() {
    if (!this.props.orders) {
      return <div>Loading>... </div>
    }
    const order = this.props.orders.find((checking) => {
      return checking.id === +this.props.match.params.orderId
    })
    if (!order) return <div>invalid order id</div>
    console.log(order)
    return (
      <div>
        <Link to={`/order-list/${order.id}`}>View This Order</Link> | <Link to={`/order-list/`}>View All Orders</Link>
        <h1>Edit Order #{order.id}</h1>
        <p>User Name: {order.user.name}</p>
        <p> Items: </p>
        <ul>
          {order.purchasedItems.map(purchasedItem => {
            return (<li key={purchasedItem.id}>{purchasedItem.item.name}</li>)
          })}
        </ul>
        <h4> Status: {order.statusName} </h4>
        <form id="form" onSubmit={this.submitHandler}>
          <div>
            <label> Status </label>
            <select name="isAdmin" className="form-control">
              <option value=""></option>
              <option value={true}>Is Admin</option>
              <option value={false}>Is Not An Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

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

