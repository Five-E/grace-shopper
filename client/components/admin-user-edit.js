import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AdminUserItem from './admin-user-item'
import { updateUser, deleteUser } from '../store'


class AdminUserEdit extends Component {

  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const street = event.target.street.value
    const city = event.target.city.value
    const state = event.target.state.value
    const isAdmin = event.target.isAdmin.value
    const updatedUser = { id: +this.props.match.params.userId }

    // Attach only valid entrys to new updatedItem
    if (name) updatedUser.name = name
    if (email) updatedUser.email = email
    if (street) updatedUser.street = street
    if (city) updatedUser.city = city
    if (state) updatedUser.state = state
    if (isAdmin === 'true') updatedUser.isAdmin = true;
    else if (isAdmin === 'false') updatedUser.isAdmin = false;

    console.log(updatedUser)
    this.props.update(updatedUser)
  }

  clickHandler() {
    const itemId = +this.props.match.params.userId
    this.props.delete(itemId)
    this.props.history.push('/admin-user-list')
  }

  render() {
    const id = this.props.match.params.userId,
      targetUser = this.props.users.find(user => user.id === +id);

    if (!targetUser) return <div>Loading...</div>;

    return (
      <div className="admin-item-edit">
        <AdminUserItem userInfo={targetUser} />

        <button className="btn btn-secondary"><NavLink to={`/admin-user-list`}>Return to User List</NavLink></button>
        <h3 className="formHeader"> Edit User Form </h3>

        <form id="form" onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" type="text" className="form-control" placeholder="New name?"></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" className="form-control" placeholder="New email?" ></input>
          </div>
          <div className="form-group">
            <label>Street</label>
            <input name="street" type="text" className="form-control" placeholder="New street?"></input>
          </div>
          <div className="form-group">
            <label>City</label>
            <input name="city" type="text" className="form-control" placeholder="New city?"></input>
          </div>
          <div className="form-group">
            <label>State</label>
            <input name="state" type="text" className="form-control" placeholder="New state?"></input>
          </div>
          <div>
            <label> Admin </label>
            <select name="isAdmin" className="form-control">
              <option value=""></option>
              <option value={true}>Is Admin</option>
              <option value={false}>Is Not An Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <button onClick={this.clickHandler} type="button" id="delete" className="btn btn-danger">Delete User</button>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    users: state.users
  }
}
const mapDispatch = dispatch => {
  return {
    update: function (updatedUser) {
      dispatch(updateUser(updatedUser))
    },
    delete: function (userId) {
      dispatch(deleteUser(userId))
    }
  }
};

export default connect(mapState, mapDispatch)(AdminUserEdit);
