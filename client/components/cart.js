import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putItemInCart, deleteCartItem} from '../store'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.quantityDropdown = this.quantityDropdown.bind(this)
  }

  quantityDropdown(stock) {
    let options = []
    for (let i = 1; i <= stock; i++) {
      options.push(i)
    }
    return options.map(idx => <option key={idx} value={idx}>{idx}</option>)
  }

  cartList() {

  }

  render() {
    if (!this.props.items) return <div> Sorry no items</div>
    if (!Object.keys(this.props.cart).length) return <div><img height="250px" src="./images/rocka.png" /><h1>The Rock Says ~~~ Why is your cart still empty?</h1></div>
    return (
      <div>
        <h1>This is your Cart {this.props.user.email}</h1>
        {Object.keys(this.props.cart).map((itemId) => {
          if (this.props.cart.hasOwnProperty(itemId)) {
            itemId = parseInt(itemId)
            const targetItem = this.props.items.find(inventory => itemId === inventory.id)
            if (!targetItem) return <div>Item not found</div>
            return (
              <div key={targetItem.id}>
                <img height="100px" src={targetItem.picture} />
                <p>{targetItem.name}</p>
                <p>{targetItem.priceDollars}</p>
                <p>{targetItem.stock} units in STOCK</p>
                <p>{this.props.cart[itemId]} units in cart</p>
                <select defaultValue={this.props.cart[itemId]} onChange={(event) => {
                  event.preventDefault()
                  const itemObj = {
                    id: targetItem.id,
                    quantity: parseInt(event.target.value)
                  }
                  this.props.changeQuantity(itemObj, this.props.user)
                }}>
                  {
                    this.quantityDropdown(targetItem.stock)
                  }
                </select>
                <button onClick={(e)=> {
                  e.preventDefault()
                  this.props.deleteItem(targetItem, this.props.user)
                }}>Delete From Cart</button>
                <hr />
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
  return {
    changeQuantity (item, user) {
			dispatch(putItemInCart(item, user))
    },
    deleteItem (item, user) {
      dispatch(deleteCartItem(item, user))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
