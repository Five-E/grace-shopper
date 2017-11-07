import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultOrders = []

/* -----------------    ACTION TYPES ------------------ */
const ORDERS_FETCHED = 'ORDERS_FETCHED'
const ORDER_UPDATED = 'ORDER_UPDATED'
const NEW_ORDER = 'NEW_ORDER'

/* ------------   ACTION CREATORS     ------------------ */
const ordersFetched = orders => ({type: ORDERS_FETCHED, orders})
const orderUpdated = order => ({type: ORDER_UPDATED, order})
const newOrder = order => ({type: NEW_ORDER, order})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultOrders, action) {
  let newState = state

  switch (action.type) {
    case ORDERS_FETCHED:
      newState = action.orders
      return newState
    case NEW_ORDER:
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
export const placeNewOrder = (userInfo, cartList) => {
  console.log("userinfo-->",userInfo)
  console.log("cartList-->",cartList)
  return function thunk (dispatch) {
    let createdOrderId 
    if (!userInfo.id) {
      let createdUserId
      userInfo.password = "DwayneBezos"
      userInfo.isGuest = true
      axios.post('/auth/guest', userInfo)
        .then(res => res.data)
        .then(guestUser => {
          createdUserId = guestUser.id
          const newOrderObj = {
            userId: createdUserId,
            statusName: 'ordered'
          }
          return axios.post('/api/orders/', newOrderObj)
        })
        .then(createdOrder => {
          createdOrderId = createdOrder.id
          console.log("====> ",createdOrder)
        })
        .catch(err => console.error(err))
    }
  }
}

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

