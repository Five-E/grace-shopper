import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import Cart from './components/cart'
import {Main, Login, Signup, UserHome, SingleProductPage, ProductList, OrderList, AddItem, AdminItemEdit, AdminItemList} from './components'
import { me, fetchItems, fetchOrders, fetchCategories } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/product-list/:itemsId" component={SingleProductPage} />
            <Route path="/product-list" component={ProductList} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/admin-list/" component={AdminItemList} />
            <Route path="/admin-list/:itemsId" component={AdminItemEdit} />
            <Route path="/order-list" render={
              () => {
                return (<OrderList orders={this.props.orders} />)
              }
            } />
            <Route path="/add-item" component={AddItem} />

            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/order-list" component={OrderList} />
                <Route path="/cart" component={Cart} />
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
    isLoggedIn: !!state.user.id,
    orders: state.orders
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
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
