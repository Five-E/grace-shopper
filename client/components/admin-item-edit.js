import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { updateItem, deleteItem } from '../store/item'


class AdminItemEdit extends Component {

  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault()
    const name = event.target.name.value
    const picture = event.target.picture.value
    const price = event.target.price.value
    const stock = event.target.stock.value
    const description = event.target.description.value
    const categoryId = event.target.category.value
    const updatedItem = { id: +this.props.match.params.itemsId }

    // Attach only valid entrys to new updatedItem
    if (name) updatedItem.name = name
    if (picture) updatedItem.picture = picture
    if (price) updatedItem.price = price
    if (stock) updatedItem.stock = stock
    if (description) updatedItem.description = description
    if (categoryId) updatedItem.categoryId = categoryId

    this.props.update(updatedItem)
  }

  clickHandler() {
    const itemId = +this.props.match.params.itemsId
    this.props.delete(itemId)
    this.props.history.push('/admin-list')
  }

  render() {

    const id = this.props.match.params.itemsId,
      targetItem = this.props.items.find(item => item.id === +id);
    const categories = this.props.categories;

    if (!targetItem) return <div>Loading...</div>;

    const { name, picture, price, stock, description } = targetItem;
    return (
      <div className="admin-item-edit">
        <h3>{name}</h3>
        <img src={picture} className="item-img" />
        <p>Description: {description}</p>
        <p>Price:       ${price}</p>
        <p>In Stock:    {stock}</p>

        <button className="btn btn-secondary"><NavLink to={`/admin-list`}>Return to Admin List</NavLink></button>
        <h3 className="formHeader"> Edit Item Form </h3>

        <form id="form" onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" className="form-control" id="inputName" placeholder="What new name?"></input>
          </div>
          <div className="form-group">
            <label htmlFor="picture">Picture</label>
            <input name="picture" type="text" className="form-control" id="inputPicture" placeholder="What's the new picture link?" ></input>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input name="price" type="number" className="form-control" id="inputPrice" placeholder="What's new the price?" step="0.01"></input>
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input name="stock" step="1" type="number" className="form-control" id="inputStock" placeholder="How many?"></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" type="textarea" className="form-control" id="inputDescription" placeholder="What about it is new?" rows="10" cols="30"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect1">Category</label>
            <select name="category" className="form-control" >
              <option value=""></option>
              {
                categories.map((category) => {
                  return (<option key={`${category.id}`} value={`${category.id}`}>{`${category.name}`}</option>);
                })
              }
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <button onClick={this.clickHandler} type="button" className="btn btn-danger">Delete Item</button>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    items: state.items,
    categories: state.categories
  }
}
const mapDispatch = (dispatch) => {
  return {
    update: function (item) {
      dispatch(updateItem(item))
    },
    delete: function (itemId) {
      dispatch(deleteItem(itemId))
    }
  }
}

export default connect(mapState, mapDispatch)(AdminItemEdit);
