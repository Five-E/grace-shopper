import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddItem extends Component {

  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault()
  }

  render() {
    const categories = this.props.categories;
    return (
      <div>
        <h3 className="formHeader"> New Item Form </h3>
        <form id="form" onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" className="form-control" id="inputName" placeholder="What name?" required></input>
          </div>
          <div className="form-group">
            <label htmlFor="picture">Picture</label>
            <input name="email" type="text" className="form-control" id="inputPicture" placeholder="What's the picture link?" ></input>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input name="price" type="number" className="form-control" id="inputPrice" placeholder="What's the price?" step="0.01" required></input>
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input name="stock" step="1" type="number" className="form-control" id="inputStock" placeholder="How many?" required></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" type="textarea" className="form-control" id="inputDescription" placeholder="What about it?" required rows="10" cols="30"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect1">Category</label>
            <select name="category" className="form-control" id="exampleSelect1" required>
              {
                categories.map((category) => {
                  return (<option key={`${category.id}`} value={`${category.id}`}>{`${category.name}`}</option>);
                })
              }
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(AddItem)
