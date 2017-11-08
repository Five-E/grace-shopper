'use strict'
import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCart = {}

/* -----------------    ACTION TYPES ------------------ */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY'
const ADD_TO_ITEM_QUANTITY = 'ADD_TO_ITEM_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
const INITIALIZE_CART = 'INITIALIZE_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

/* ------------   ACTION CREATORS     ------------------ */
export const addItemToCart = item => ({ type: ADD_ITEM_TO_CART, item })
export const changeItemQuantity = item => ({ type: CHANGE_ITEM_QUANTITY, item })
export const addToItemQuantity = item => ({ type: ADD_TO_ITEM_QUANTITY, item })
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
    case CHANGE_ITEM_QUANTITY:
    newState[action.item.id] = action.item.quantity
      return newState
    case ADD_TO_ITEM_QUANTITY:
      newState[action.item.id] = newState[action.item.id] + action.item.quantity
      return newState
    case ADD_ITEM_TO_CART:
      if (!newState[action.item.id]) {
        newState[action.item.id] = 1
      } else {
        newState[action.item.id] = newState[action.item.id] + 1
      }
      return newState
    default:
      return state
  }
}

/* ------------   THUNK CREATORs     ------------------ */
export const emptyCartStart = (user) => {
  return function thunk (dispatch) {
    if(!user.id) {
      window.localStorage.clear()
      dispatch(clearCart())
    } else {
      axios.delete(`/api/cartItems/${user.id}`)
        .then(_ => {
          dispatch(clearCart())
        })
    }
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

const postCartItem = (itemObj) => {
  return axios.post(`/api/cartItems`, itemObj)
  .then(res => res.data)
}

export const setCartItemQuantity = (item, user) => {
  return function thunk (dispatch) {
    if (user.id) {
      const itemObj = {
        itemId: item.id,
        userId: user.id,
        quantity: item.quantity
      }
      postCartItem(itemObj)
        .then(cartItem => {
          const updateItemQuantityObj = {
            id: cartItem.itemId,
            quantity: cartItem.quantity
          }
          dispatch(changeItemQuantity(updateItemQuantityObj))
        })
        .catch(console.error)
    } else {
      const updateItemQuantityObj = {
        id: item.id,
        quantity: item.quantity
      }
      if (!window.localStorage.getItem('cartItems')) {
        const items = {[item.id]: updateItemQuantityObj.quantity}
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      } else {
        const items = JSON.parse(window.localStorage.getItem('cartItems'))
        items[item.id] = item.quantity
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      }
      dispatch(changeItemQuantity(updateItemQuantityObj))
    }
  }
}

export const addToCartItemQuantity = (item, user) => {
  return function thunk (dispatch) {
    if (user.id) {
      const itemObj = {
        itemId: item.id,
        userId: user.id,
        quantity: item.quantity
      }
      return axios.post(`/api/cartItems/addQuantity`, itemObj)
        .then(res => res.data)
        .then(cartItem => {
          const updateItemQuantityObj = {
            id: cartItem.itemId,
            quantity: cartItem.quantity
          }
          dispatch(changeItemQuantity(updateItemQuantityObj))
        })
        .catch(console.error)
    } else {
      const updateItemQuantityObj = {
        id: item.id,
        quantity: item.quantity
      }
      if (!window.localStorage.getItem('cartItems')) {
        const items = {[item.id]: updateItemQuantityObj.quantity}
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      } else {
        const items = JSON.parse(window.localStorage.getItem('cartItems'))
        items[item.id] = item.quantity + items[item.id]
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      }
      dispatch(addToItemQuantity(updateItemQuantityObj))
    }
  }
}

export const addOneItemToCart = (item, user) => {
  return function thunk (dispatch) {
    if (user.id) {
      const itemObj = {
        itemId: item.id,
        userId: user.id,
      }
      postCartItem(itemObj)
        .then(cartItem => {
          return dispatch(addItemToCart({id: cartItem.itemId}))
        })
        .catch(console.error)
    } else {
      if (!window.localStorage.getItem('cartItems')) {
        const items = {[item.id]: 1}
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      } else {
        const items = JSON.parse(window.localStorage.getItem('cartItems'))
        if (!items[item.id]) {
          items[item.id] = 1
        } else {
          items[item.id] = items[item.id] + 1
        }
        window.localStorage.setItem('cartItems', JSON.stringify(items))
      }
      dispatch(addItemToCart({id: item.id}))
    }
  }
}

export const initializeCartState = (user) => {
  return function thunk (dispatch) {
    if (!user.id) {
      const localStoreCart = window.localStorage.getItem('cartItems')
      if (localStoreCart) {
        const items = JSON.parse(localStoreCart)
        Object.keys(items).map(itemId => {
          const itemObj = {
            id: parseInt(itemId),
            quantity: items[itemId]
          }
          dispatch(setCartItemQuantity(itemObj, user))
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
            dispatch(setCartItemQuantity(itemObj, user))
          })
        })
        .then(_ => {
          const localCart = JSON.parse(window.localStorage.getItem('cartItems'))
          window.localStorage.clear()
          for (let itemId in localCart) {
            if (localCart.hasOwnProperty(itemId)) {
              const item = {
                id: parseInt(itemId),
                quantity: parseInt(localCart[itemId])
              }
              dispatch(addToCartItemQuantity(item, user))
            }
          }
        })
    }
    dispatch(initializeCart())
  }
}
