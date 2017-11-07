import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultOrders = []

/* -----------------    ACTION TYPES ------------------ */
const ORDERS_FETCHED = 'ORDERS_FETCHED'
const ORDER_UPDATED = 'ORDER_UPDATED'

/* ------------   ACTION CREATORS     ------------------ */
const ordersFetched = orders => ({type: ORDERS_FETCHED, orders})
const orderUpdated = order => ({type: ORDER_UPDATED, order})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultOrders, action) {
  let newState = state

  switch (action.type) {
    case ORDERS_FETCHED:
      newState = action.orders
      return newState
    case ORDER_UPDATED:
      newState = newState.slice()
      newState.forEach((order) => {
        if (order.id === action.order.id) {
          order.statusName = action.order.statusName
        }
      })
      return newState
    default:
      return state
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchOrders = () => {
  return function thunk (dispatch) {
    axios.get('/api/orders')
    .then(res => {
      const orders = res.data
      dispatch(ordersFetched(orders))
    })
    .catch(() => console.log('Fetching orders unsuccessful'))
  }
}

export const updateOrder = (order) => {
  return function thunk(dispatch) {
    axios.put(`/api/orders/${order.id}`, order)
    .then(res => res.data)
    .then(updatedOrder => {
      dispatch(orderUpdated(updatedOrder))
    })
    .catch(() => console.log('Updating an order unsuccessful'))
  }
}

