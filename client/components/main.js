import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {

  render() {
    const cartItemCount = Object.keys(this.props.cart)
      .reduce((accum, itemId) => {
        return accum + this.props.cart[itemId]
    }, 0)
    const { children, handleClick, isLoggedIn } = this.props;

    return (
      <div>
        <h1>Adopt A Rock</h1>
        <nav>
        <Link to="/home">Home</Link>
          {
            isLoggedIn
              ?
                <div className="inline">
                {/* The navbar will show these links after you log in */}
                  <a href="#" onClick={handleClick}>Logout</a>
                </div>
              :
                <div className="inline">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                </div>
          }
          <Link to="/product-list">View All Products</Link>
          <Link to="/cart"><div className="cart">
          <img src="../../images/rockB.png" />
          <h1>{cartItemCount}</h1>
          <p>Rock Cart</p>
          </div></Link>
        </nav>
        <hr />
        {children}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  //fetchInitialData: PropTypes.func.isRequired
}
