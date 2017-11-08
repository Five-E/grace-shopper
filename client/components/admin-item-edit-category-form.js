import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItemCategories, addItemCategory, deleteItemCategory } from '../store/itemCategories'
import { fetchCategories } from '../store/category'


export class AdminEditItemCategory extends Component {

  componentDidMount () {
    this.props.loadInitialCategories()
  }

  render() {
    const { itemCategories, categories, handleAddCategory, handleDeleteCategory } = this.props
    let filteredCategories = []
    if (itemCategories) {
      const itemCategoriesIds = itemCategories.map(category => category.id)
      filteredCategories = categories.filter(category => itemCategoriesIds.indexOf(category.id) === -1)
    } else {
      return <div>Loading...</div>
    }
    return (
      <div className="admin-item-edit">
        <h3 className="formHeader"> Edit Item Categories </h3>
        <form onSubmit={handleAddCategory}>
          <div className="form-group">
            <label htmlFor="exampleSelect1">All Categories</label>
            <select className="form-control" name="selectCategory">
              <option value=""></option>
              {
                filteredCategories.length && filteredCategories.map((category) => {
                  return (<option key={category.id} value={category.id}>{category.name}</option>);
                })
              }
            </select>
            <button type="submit" className="btn btn-default">Add category</button>
          </div>
          <ul className="list-group">
            <h4>Item Categories</h4>
            {
              itemCategories.length && itemCategories.map(category => {
                return (<li className="list-group-item" key={category.id}>{category.name} <span className="glyphicon glyphicon-remove" onClick={(event) => handleDeleteCategory(event, category.id, itemCategories.length)}></span></li>)
              })
            }
          </ul>
        </form>
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    items: state.items,
    categories: state.categories,
    itemCategories: state.itemCategories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const itemId = +ownProps.itemId
  return {
    loadInitialCategories: function() {
      dispatch(fetchItemCategories(itemId))
      dispatch(fetchCategories())
    },
    handleAddCategory: function (event) {
      event.preventDefault()
      const categoryId = +event.target.selectCategory.value
      dispatch(addItemCategory(itemId, categoryId))
    },
    handleDeleteCategory: function (event, categoryId, length) {
      if (length === 1) {
        alert('Item must have at least one category')
        return ''
      } else {
        event.preventDefault()
        dispatch(deleteItemCategory(itemId, categoryId))
      }
    }
  }
}

export default connect(mapState, mapDispatch)(AdminEditItemCategory);
