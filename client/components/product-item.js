import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
export const ProductItem = (props) => {

    if (!props) return <div>Loading>... </div>;

    const { name, picture, price, id, description } = props.itemInfo;

    return (
        <div className="col-xs-18 col-sm-6 col-md-3">
            <NavLink to={`/product-list/${id}`}>
                <div className="thumbnail">
                    <img src={picture} className="item-img"/>
                    <div className="caption">
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>Price: ${price}</p>
                        <p><a href="#" className="btn btn-info btn-xs" role="button">Add to Cart</a></p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}
