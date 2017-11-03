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

  render() {
    return (
      <div>
        <h1>This Person's Cart</h1>
        {
          this.props.cart.map((item) => {
            const targetItem = this.props.items.find(inventory => item.id === inventory.id)
            return (
              <div key={item.id}>
                <img src={item.picture} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <select>
                  {
                    this.quantityDropdown(targetItem.stock)
                  }
                </select>
              </div>
            )
          })
        }
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
