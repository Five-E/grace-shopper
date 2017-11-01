import React from 'react'
import { connect } from 'react-redux'


const ProductList = (props) => {

  const items = props.items;

  return (
    <div>
      <h3>Product List Page</h3>
      {
        items.map(item => {
          return (
            <div key={item.id}>{item.name}</div>
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
