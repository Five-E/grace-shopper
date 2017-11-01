import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const ProductList = (props) => {

  return (
    <div>
      <h3>Product List</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {

}

const mapDispatch = (dispatch) => {

}

export default connect(mapState, mapDispatch)(ProductList)

/**
 * PROP TYPES
 */

