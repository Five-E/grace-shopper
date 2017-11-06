import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import items from './item';
import orders from './orders';
import categories from './category';
import selectedCategory from './selectedCategory';

const reducer = combineReducers({user, items, orders, categories, selectedCategory})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './item'
export * from './orders'
export * from './category'
export * from './selectedCategory'
