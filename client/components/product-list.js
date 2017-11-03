import React from 'react'
import { connect } from 'react-redux'
import { ProductItem } from './product-item'
import { addItemToCart } from '../store'

const ProductList = (props) => {

  const items = props.items

  return (
    <div>
      <h3>Product List Page</h3>
      <div className="row">
        {
          items.map(item => {
            return (
              <div key={item.id}>
                <ProductItem addToCart={props.addToCart} itemInfo={item} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const mapState = (state) => {
  return { items: state.items }
}

const mapDispatch = dispatch => {
	return {
		addToCart (item) {
			dispatch(addItemToCart(item))
		}
	}
}

export default connect(mapState, mapDispatch)(ProductList)
