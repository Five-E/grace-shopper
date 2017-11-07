import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { statusSelected, statusUnselected } from '../store'

class OrderList extends Component {

  render() {
    let orders = this.props.orders

    if (!orders) return (<div id="warning"> The Rock can't cook up orders because we don't have any orders to cook. Get some people to buy rocks. </div>)
    console.log(this.props.selectedStatus)
    if (this.props.selectedStatus) {
      orders = orders.filter((order) => {
        return order.statusName === this.props.selectedStatus
      })
    }
    return (
      <div>
        <h3>Orders List Page</h3>
        <div>
          <button className="btn btn-primary categoryFilter" onClick={this.props.showAll}> All </button>
          {
            this.props.statuses.map(status => {
              return (<button key={status.name} onClick={this.props.handleClick} className="btn btn-primary categoryFilter">{status.name}</button>)
            })
          }
        </div>
        {
          orders.map(order => {
            return (
              <Link key={order.id} to={`/order-list/${order.id}`}><div id="order-box" style={{ margin: '10px', padding: '15px', border: 'solid 1px black' }} >
                <span style={{ fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px' }}>order id</span>
                {order.id}
                <span style={{ fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px' }}>order by</span>
                {order.user.name}
                <span style={{ fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px' }}>order date</span>
                {order.createdAt}
                <span style={{ fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px' }}>order total paid</span>
                {order.totalPrice}
                <span style={{ fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px' }}>order item count</span>
                {order.itemQuantity}
                <span style={{ fontWeight: 'bold', paddingLeft: '15px', paddingRight: '5px' }}>order state</span>
                {order.statusName}
              </div></Link>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    orders: state.orders,
    statuses: state.statuses,
    selectedStatus: state.selectedStatus
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: function(event) {
      const status = event.target.innerHTML
      dispatch(statusSelected(status))
    },
    showAll: function () {
      dispatch(statusUnselected())
    }
  }
}

export default connect(mapState, mapDispatch)(OrderList)
