import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import {Main, Cart, Login, Signup, UserHome, SingleProductPage, ProductList, OrderList, AddItem, AdminHome, AdminItemEdit, AdminItemList, AdminCategoryList, AdminCategoryAdd, AdminCategoryEdit, OrderItem, OrderItemEdit, AdminUserEdit, AdminUserList, UserOrders, Checkout} from './components'
import { me, fetchItems, fetchOrders, fetchCategories, fetchUsers, fetchStatuses, fetchReviews  } from './store'
import RateForm from './components/rate-form'
import {OrderSuccess} from './components'

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
            <Route path="/order-success/:orderId" component={OrderSuccess} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/product-list/:itemsId" component={SingleProductPage} />
            <Route path="/product-list" component={ProductList} />
            <Route exact path="/admin-item-list" component={AdminItemList} />
            <Route exact path="/admin-category-list" component={AdminCategoryList} />
            <Route exact path="/admin-category-add" component={AdminCategoryAdd} />
            <Route path="/admin-item-list/:itemsId" component={AdminItemEdit} />
            <Route path="/admin-category-list/:categoryId" component={AdminCategoryEdit} />
            <Route path="/cart" component={Cart} />
            <Route path="/order-list/edit/:orderId" component={OrderItemEdit} />
            <Route path="/order-list/:orderId" component={OrderItem} />
            <Route exact path="/order-list" component={OrderList} />
            <Route path="/add-item" component={AddItem} />
            <Route exact path="/admin-user-list" component={AdminUserList} />
            <Route path="/admin-user-list/:userId" component={AdminUserEdit} />
            {isLoggedIn && <Route exact path="/product-rating/:itemId" component={RateForm} />}
            {
              isLoggedIn &&
              <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/order-list" component={OrderList} />
              <Route path="/cart" component={Cart} />
              <Route path="/home" component={UserHome} />
              <Route exact path="/my-orders" component={UserOrders} />
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
    user: state.user,
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchItems())
      dispatch(fetchOrders())
      dispatch(fetchCategories())
      dispatch(fetchUsers())
      dispatch(fetchStatuses())
      dispatch(fetchReviews())
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
