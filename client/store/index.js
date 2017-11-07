import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import users from './users'
import items from './item'
import orders from './orders'
import cart from './cart'
import categories from './category';
import selectedCategory from './selectedCategory';
import statuses from './status'
import selectedStatus from './selectedStatus'


const reducer = combineReducers({user, items, orders, categories, cart, selectedCategory, users, statuses, selectedStatus})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './item'
export * from './cart'
export * from './orders'
export * from './category'
export * from './selectedCategory'
export * from './users'
export * from './status'
export * from './selectedStatus'
