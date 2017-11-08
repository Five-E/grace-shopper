import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


export default class AdminCategory extends Component {

  render() {
    if (!this.props) return <div>Loading>... </div>;

    const { name, image, id } = this.props.cateInfo;
    return (
      <div className="col-xs-18 col-sm-6 col-md-3">
        <div className="thumbnail">
          <img src={image} className="item-img"/>
          <div className="caption">
            <NavLink to={`/category-list/${id}`}>
              <h3>{name}</h3>
            </NavLink>
          </div>
          <NavLink to={`/category-list/${id}`}>
            <button type="button" className="btn btn-secondary">Edit</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
