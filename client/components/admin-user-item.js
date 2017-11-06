import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


export default class AdminUserItem extends Component {

  render() {
    if (!this.props) return <div>Loading>... </div>;

    const { name, email, id, street, city, state, zip, isAdmin } = this.props.userInfo;
    return (
      <div className="col-xs-18 col-sm-6 col-md-3">
        <div className="thumbnail">
          <div className="caption">
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{isAdmin ? 'Admin' : 'Not An Admin'}</p>
            <p>User Id: {id}</p>
            <h4> Address: </h4>
            <p>{street}</p>
            <p>{city}</p>
            <p>{state}</p>
            <p>{zip}</p>
          </div>
            <NavLink to={`/admin-user-list/${id}`}>
            <button type="button" className="btn btn-secondary">Edit</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
