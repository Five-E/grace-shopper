'use strict'
import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCart = []

/* -----------------    ACTION TYPES ------------------ */
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'

/* ------------   ACTION CREATORS     ------------------ */
export const addItemToCart = item => ({type: ADD_ITEM_TO_CART, item})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultCart, action) {
  let newState = state

  switch (action.type) {
    case ADD_ITEM_TO_CART:
      newState = [...newState, action.item]
      return newState
    default:
      return state
  }
}

/* ------------   THUNK CREATORs     ------------------ */
export const putItemInCart = (item, user) => {
  const obj = {itemId: item.id,
               userId: user.id,
               quantity: 1 }
  return function thunk (dispatch) {
    if (user.id) {
      axios.post(`api/cartItems`, obj)
        .then(res => res.data)
        .catch(console.error)
    }
    dispatch(addItemToCart(item))
  }
}
