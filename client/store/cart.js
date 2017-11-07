'use strict'
import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCart = {}

/* -----------------    ACTION TYPES ------------------ */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const INITIALIZE_CART = 'INITIALIZE_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

/* ------------   ACTION CREATORS     ------------------ */
export const addItemToCart = item => ({ type: ADD_ITEM_TO_CART, item })
export const clearCart = () => ({ type: CLEAR_CART })
export const initializeCart = () => ({ type: INITIALIZE_CART })
export const removeItemFromCart = (item) => ({ type: REMOVE_ITEM_FROM_CART, item })

/* ------------       REDUCER     ------------------ */
export default function (state = defaultCart, action) {
  let newState = {...state}
  switch (action.type) {
    case REMOVE_ITEM_FROM_CART:
      delete newState[action.item.id]
      return newState
    case CLEAR_CART:
      return defaultCart
    case ADD_ITEM_TO_CART:
      if (!newState[action.item.id]) {
        newState[action.item.id] = action.item.quantity || 1
      } else {
        newState[action.item.id] = action.item.quantity || newState[action.item.id] + 1
      }
      return newState
    default:
      return state
  }
}

/* ------------   THUNK CREATORs     ------------------ */
export const initializeCartState = (user) => {
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
      axios.get(`/api/cartItems/${user.id}`)
        .then(res => res.data)
        .then(items => {
          return items.length && items.map(item => {
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

export const deleteCartItem = (item, user) => {
  return function thunk (dispatch) {
    if(user.id) {
      axios.delete(`/api/cartItems/${user.id}/${item.id}`)
      .then(res => res.data)
      .then(status => {
        if (status === 'dropped by the rock') {
          dispatch(removeItemFromCart(item))
        }
      })
    } else {
      const items = JSON.parse(window.localStorage.getItem('cartItems'))
      delete items[item.id]
      window.localStorage.setItem('cartItems', JSON.stringify(items))
      dispatch(removeItemFromCart(item))
    }
  }
}

export const putItemInCart = (item, user) => {
  
  return function thunk (dispatch) {
    if (user.id) {
      const itemObj = {
        itemId: item.id,
        userId: user.id,
        quantity: item.quantity || 1
      }
      axios.post(`/api/cartItems`, itemObj)
        .then(res => res.data)
        .then(cartItem => {
          const itemObj = {
            id: cartItem.itemId,
            quantity: cartItem.quantity
          }
          dispatch(addItemToCart(itemObj))
        })
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
