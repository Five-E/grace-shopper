import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


export default class AdminItem extends Component {

  render() {
    if (!this.props) return <div>Loading>... </div>;

    const { name, price, id, description } = this.props.itemInfo;
    return (
      <div className="col-xs-18 col-sm-6 col-md-3">
        <div className="thumbnail">
          <div className="caption">
            <NavLink to={`/product-list/${id}`}>
              <h3>{name}</h3>
            </NavLink>
            <p>{description}</p>
            <p>Price: ${price}</p>
          </div>
          <NavLink to={`/admin-list/${id}`}>
            <button type="button" className="btn btn-secondary">Edit</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
