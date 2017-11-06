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
    console.log(window.localStorage, '!!!!!!!!!!!!!!')
    return (
      <div>
        <h1>This Person's Cart</h1>
        {
          Object.keys(this.props.cart).map((itemId) => {
            const targetItem = this.props.items.find(inventory => parseInt(itemId, 10) === inventory.id)
            return (
              <div key={targetItem.id}>
                <img src={targetItem.picture} />
                <p>{targetItem.name}</p>
                <p>${targetItem.price}</p>
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
