import React from 'react'
import { connect } from 'react-redux'
import { ProductItem } from './product-item' 


const ProductList = (props) => {

  const items = props.items;

  return (
    <div>
      <h3>Product List Page</h3>
      {
        items.map(item => {
          return (
            <div key={item.id}>
              <ProductItem itemInfo={item} />
            </div>
          )
        })
      }
    </div>
  )
}

const mapState = (state) => {
  return { items: state.items }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProductList)
