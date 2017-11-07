'use strict'
import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCart = {
  initialized: false
}

/* -----------------    ACTION TYPES ------------------ */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const INITIALIZE_CART = 'INITIALIZE_CART'

/* ------------   ACTION CREATORS     ------------------ */
export const addItemToCart = item => ({ type: ADD_ITEM_TO_CART, item })
export const clearCart = () => ({ type: CLEAR_CART })
export const initializeCart = () => ({ type: INITIALIZE_CART })

/* ------------       REDUCER     ------------------ */
export default function (state = defaultCart, action) {
  let newState = {...state}
  switch (action.type) {
    case INITIALIZE_CART:
      newState.initialized = true
      return newState
    case CLEAR_CART:
      return defaultCart
    case ADD_ITEM_TO_CART:
      if (!newState[action.item.id]) {
          newState[action.item.id] = action.item.quantity || 1
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
export const initializeCartState = (user) => {
  console.log("USER PASSED IN ============>", user )
  console.log("!!user-->",!user)
  return function thunk (dispatch) {
    if (Object.keys(user).length === 0) {
      const localStoreCart = window.localStorage.getItem('cartItems')
      if (localStoreCart) {
        const items = JSON.parse(localStoreCart)
        Object.keys(items).map(itemId => {
          const itemObj = {
            id: parseInt(itemId), 
            quantity: items[itemId]
          }
          dispatch(addItemToCart(itemObj))
        })
      }
    } else {
      console.log("USER-------------> ", user)
      console.log("******************");
      axios.get(`api/cartItems/${user.id}`)
        .then(res => res.data)
        .then(items => {
          console.log("--------")
          items.forEach(item => {
            const itemObj = {
              id: item.itemId,
              quantity: item.quantity
            }
            dispatch(addItemToCart(itemObj))
          })
        })
    }
    dispatch(initializeCart())
  }
}

export const putItemInCart = (item, user) => {
  console.log("ITEM:IN PUTITEMINCART:::", item, "USER",user)
  const itemObj = {itemId: item.id,
               userId: user.id,
               quantity: item.quantity || 1 }
  return function thunk (dispatch) {
    if (user.id) {
      axios.post(`api/cartItems`, itemObj)
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
