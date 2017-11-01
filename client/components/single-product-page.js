import React from 'react'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const SingleProductPage = (props) => {
    const { name, picture, price, stock, description } = props;
    const id = props.match.params.itemsId; 

    return (
        <div>
            <img src={picture} />
            <h3>{name}</h3>
            <p>Description: {description}</p>
            <p>Price:       ${price}</p>
            <p>In Stock:    {stock}</p>

            <form onSubmit={handleSubmit}>
                <select>
                    {quantityDropdown(stock)}
                </select>
                <button>Add to Cart</button>
            </form>

            <h1>Reviews Placeholder</h1>
            {/* Create Reviews List component */}
        </div>
    );
}


function handleSubmit(event) {
    event.preventDefault(); 

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
const mapState = (state) => {}
const mapDispatch = (dispatch) => {
    return {
        addToCart: function (items) {
            //dispatch(OUR_THUNKER(items))
        }
    }
}

export default connect(null, mapDispatch)(SingleProductPage); 
