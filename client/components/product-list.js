import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item';

/**
 * COMPONENT
 */
class ProductList extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render(props) {
    return (
      <div>
        <h3>Product List</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {

}

const mapDispatch = (dispatch) => {
    return {
      fetchInitialData: function() {
      dispatch(fetchItems());
    }
  }
}

export default connect(mapState, mapDispatch)(ProductList)

/**
 * PROP TYPES
 */

