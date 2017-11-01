import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
export const ProductItem = (props) => {

    if (!props) return <div>Loading>... </div>;

    const { name, picture, price, stock, description, id } = props.itemInfo;

    return (
        <div>
            <img src={picture} />
            <NavLink to={`/product-list/${id}`}>{name}</NavLink>
            <p>Price: ${price}</p>
        </div>
    );
}
