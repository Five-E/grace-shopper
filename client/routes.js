import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, SingleProductPage} from './components'
import {me} from './store'
import { fetchItems } from './store/item'
import { fetchOrders } from './store/orders'
import { fetchCategories } from './store/category'
import ProductList from './components/product-list'
import OrderList from './components/order-list'
import AddItem from './components/add-item'
import AdminItemList from './components/admin-item-list'
import AdminItemEdit from './components/admin-item-edit'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props
    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/product-list/:itemsId" component={SingleProductPage} />
            <Route path="/product-list" component={ProductList} />
            <Route exact path="/admin-list/" component={AdminItemList} />
            <Route path="/admin-list/:itemsId" component={AdminItemEdit} />
            <Route path="/order-list" component={OrderList} />
            <Route path="/add-item" component={AddItem} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchItems())
      dispatch(fetchOrders())
      dispatch(fetchCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
