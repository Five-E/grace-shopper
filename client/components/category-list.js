import React from 'react';
import { connect } from 'react-redux';
import { categorySelected, categoryUnselected } from '../store';

const CategoryList = (props) => {
  return (
    <ul className="nav nav-pills nav-stacked">
      {
        props.categories.map(category => {
          return (
            <li key={category.id} onClick={props.handleClick} value={category.id}>{category.name}</li>
          )
        })
      }
      <li onClick={props.showAllProducts}>All Products</li>
    </ul>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(event) {
      const categoryId = event.target.value;
      event.preventDefault();
      dispatch(categorySelected(categoryId));
    },

    showAllProducts(event) {
      event.preventDefault();
      dispatch(categoryUnselected());
    }
  }
}

export default connect(mapState, mapDispatch)(CategoryList)
