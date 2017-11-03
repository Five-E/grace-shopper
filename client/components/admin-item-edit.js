import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

/**
 * COMPONENT
 */
export const AdminItemEdit = (props) => {

  const id = props.match.params.itemsId,
    targetItem = props.items.find(item => item.id === +id);

  if (!targetItem) return <div>Loading...</div>;

  const { name, price, stock, description } = targetItem;
  return (
    <div>
      <h3>{name}</h3>
      <p>Description: {description}</p>
      <p>Price:       ${price}</p>
      <p>In Stock:    {stock}</p>

      <button><NavLink to={`/admin-list`}>Return to Admin List</NavLink></button>

      <h1>Reviews Placeholder</h1>
      {/* Create Reviews List component */}
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    items: state.items
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault();

    },

  }
}

export default connect(mapState, mapDispatch)(AdminItemEdit);
