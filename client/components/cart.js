import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    return (
      <div>
        <h1>This Person's Cart</h1>
        <img src="#" />
        <p>Name</p>
        <p>price</p>
        <p>quantity</p>
      </div>

    )
  }
}

// const mapState = (state) => {
//   return {
//     cartItems: state.cartItems
//   }
// }

export default connect(null, null)(Cart)
