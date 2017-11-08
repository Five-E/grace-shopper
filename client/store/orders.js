import axios from 'axios'
import history from '../history'
import { emptyCartStart } from './cart'
import { fetchItems } from './item'

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
      newState.push(action.order)
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
  return function thunk (dispatch) {
    let createdOrderId 
    if (!userInfo.id) {
      // need to create guest account and store its ID for use
      let createdUserId
      // lets set a password for the guest user
      userInfo.password = "DwayneBezos" + Math.random()
      userInfo.isGuest = true
      // post this to our guest user creator
      axios.post('/auth/guest', userInfo)
        .then(res => res.data)
        .then(guestUser => {
          // store the guest user id
          createdUserId = guestUser.id
          const newOrderObj = {
            userId: createdUserId,
            statusName: 'ordered'
          }
          // submit the new order
          return axios.post('/api/orders/', newOrderObj)
        })
        .then(res => res.data)
        .then(createdOrder => {
          //store new order id
          createdOrderId = createdOrder.id
          // create purchased items using cartList
          return axios.post(`/api/purchasedItems/${createdOrderId}`, cartList)
        })
        .then(() => axios.get(`/api/orders/${createdOrderId}`))
        .then(res => res.data)
        .then((fullOrder) => {
          dispatch(fetchItems())
          dispatch(newOrder(fullOrder))
          dispatch(emptyCartStart({}))
          history.push(`/order-success/${fullOrder.id}`)
        })
        .catch(err => console.error(err))
    } else {
      // user already has an account
      const newOrderObj = {
        userId: userInfo.id,
        statusName: 'ordered'
      }
      return axios.post('/api/orders', newOrderObj)
        .then(res => res.data)
        .then(createdOrder => {
          createdOrderId = createdOrder.id
          return axios.post(`/api/purchasedItems/${createdOrderId}`, cartList)
        })
        .then(() => axios.get(`/api/orders/${createdOrderId}`))
        .then(res => res.data)
        .then((fullOrder) => {
          dispatch(fetchItems())
          dispatch(newOrder(fullOrder))
          dispatch(emptyCartStart(userInfo))
          history.push(`/order-success/${fullOrder.id}`)
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

