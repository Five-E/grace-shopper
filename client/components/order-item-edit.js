import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateOrder } from '../store'

class OrderItemEdit extends Component {
  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault()
    const updatedOrder = { id: this.props.match.params.orderId }
    if (event.target.status.value) updatedOrder.statusName = event.target.status.value

    this.props.update(updatedOrder)
  }
  render() {
    if (!this.props.orders) {
      return <div>Loading>... </div>
    }
    const order = this.props.orders.find((checking) => {
      return checking.id === +this.props.match.params.orderId
    })
    if (!order) return <div>invalid order id</div>

    const { statuses } = this.props;

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
            <select name="status" className="form-control">
              <option value=""></option>
              {
                statuses.map(status => <option key={status.name}>{status.name}</option>)
              }
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Change</button>
        </form>
      </div>)

  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    orders: state.orders,
    statuses: state.statuses
  }
}

const mapDispatch = (dispatch) => {
  return {
    update: function (updatedOrder) {
      dispatch(updateOrder(updatedOrder))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderItemEdit)

