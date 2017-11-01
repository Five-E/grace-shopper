import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const SingleProduct = (props) => {
    const { name, picture, price, stock, description } = props;

    return (
        <div>
            <img src={picture} />
            <h3>{name}</h3>
            <p>Description: {description}</p>
            <p>Price: ${price}</p>
            <p>In Stock: {stock}</p>

            <form onSubmit={}>
                <select>
                    {quantityDropdown(stock)}
                </select>
                <button>Add to Cart</button>
            </form>
        </div>
    );
}

function quantityDropdown(stock) {
    let options = [];
    for (let i = 1; i < stock; i++) {
        option.push(i); 
    }
    return options.map(idx => <option>idx</option>);
}

/**
 * CONTAINER
 */
const mapState = (state) => {

}

export default connect(mapState)(SingleProduct); 
