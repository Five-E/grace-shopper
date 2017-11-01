import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
export const ProductItem = (props) => {
    const { name, picture, price, stock, description, id } = props;

    return (
        <div>
            <img src={picture} />
            <NavLink to={`/items/${id}`}>{name}</NavLink>
            <p>Price: ${price}</p>
        </div>
    );
}
