'use strict'
import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCart = {}

/* -----------------    ACTION TYPES ------------------ */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const CLEAR_CART = 'CLEAR_CART'

/* ------------   ACTION CREATORS     ------------------ */
export const addItemToCart = item => ({type: ADD_ITEM_TO_CART, item})
export const clearCart = () => ({type: CLEAR_CART})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultCart, action) {
  let newState = {...state}
  switch (action.type) {
    case CLEAR_CART:
      return defaultCart
    case ADD_ITEM_TO_CART:
      if (!newState[action.item.id]) {
          console.log("rocking actions", action)
          const quantity = action.item.quantity ? action.item.quantity : 1
          newState[action.item.id] = quantity
      } else {
        newState[action.item.id]++
      }
      console.log('current state', newState)
      return newState
    default:
      return state
  }
}

/* ------------   THUNK CREATORs     ------------------ */
export const putItemInCart = (item, user) => {
  console.log("ITEM:IN PUTITEMINCART:::", item, "USER",user)
  const obj = {itemId: item.id,
               userId: user.id,
               quantity: item.quantity || 1 }
  return function thunk (dispatch) {
    if (user.id) {
      axios.post(`api/cartItems`, obj)
        .then(res => res.data)
        .then(_ => dispatch(addItemToCart(item)))
        .catch(console.error)
    } else {
      if (!window.localStorage.getItem('cartItems')) {
        const items = {[item.id]: 1}
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      } else {
        const items = JSON.parse(window.localStorage.getItem('cartItems'))
        if (items[item.id]) {
          items[item.id]++
        } else {
          items[item.id] = 1
        }
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      }
      dispatch(addItemToCart(item))
    }
  }
}
