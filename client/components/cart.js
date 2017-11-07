import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.quantityDropdown = this.quantityDropdown.bind(this)
  }

  quantityDropdown(stock) {
    let options = []
    for (let i = 1; i < stock + 1; i++) {
      options.push(i)
    }
    return options.map(idx => <option key={idx}>{idx}</option>)
  }

  cartList() {

  }

  render() {
    console.log(window.localStorage, '!!!!!!!!!!!!!!')
    if (!this.props.items) return <div> Sorry no items</div>
    return (
      <div>
        <h1>This Person's Cart</h1>
        {Object.keys(this.props.cart).map((itemId) => {
          if (this.props.cart.hasOwnProperty(itemId) && itemId !== 'initialized' ) {
            itemId = parseInt(itemId)
            console.log("items==>",this.props.items)
            console.log("item here-->",itemId,"| has own prop--> ",this.props.cart.hasOwnProperty(itemId))
            const targetItem = this.props.items.find(inventory => itemId === inventory.id)
            console.log("targetItem -->", targetItem)
            console.log("cart props -->", this.props.cart)
            if (!targetItem) return <div>Item not found</div>
            return (
              <div key={targetItem.id}>
                <img height="100px" src={targetItem.picture} />
                <p>{targetItem.name}</p>
                <p>${targetItem.price}</p>
                <select>
                  {
                    this.quantityDropdown(targetItem.stock)
                  }
                </select>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    items: state.items
  }
}

const mapDispatch = (dispatch) => {
  // dispatch our action creator.
}

export default connect(mapState, null)(Cart)
