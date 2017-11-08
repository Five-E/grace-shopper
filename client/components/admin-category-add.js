import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addCategory } from '../store/category'


class AdminCategoryAdd extends Component {

  constructor(props) {
    super(props)
    this.satate = {
      error: false
    }
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault()
    const name = event.target.name.value
    const image = event.target.picture.value
    const categories = this.props.categories;
    if (categories.find(category => category.name === name)) {
      this.setState({error: true})
    } else {
      this.props.addCategory({name, image})
    }
  }

  render() {
    const error = this.state.error
    return (
      <div className="admin-Category-add">

        <button className="btn btn-secondary"><NavLink to={`/admin-category-list`}>Return to Admin Category List</NavLink></button>
        <h3 className="formHeader"> Add Category Form </h3>

        <form id="form" onSubmit={this.submitHandler}>
        {error && <div className="alert alert-danger">Category name is a duplicate</div>}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" className="form-control" id="inputName" placeholder="What new name?"></input>
          </div>
          <div className="form-group">
            <label htmlFor="picture">Picture</label>
            <input name="picture" type="text" className="form-control" id="inputPicture" placeholder="What's the new picture link?" ></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    categories: state.categories
  }
}
const mapDispatch = (dispatch) => {
  return {
    update: function (Category) {
      dispatch(addCategory(Category))
    }
  }
}

export default connect(mapState, mapDispatch)(AdminCategoryAdd);
