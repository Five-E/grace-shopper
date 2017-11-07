import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Cart from './cart'
import { placeNewOrder } from '../store'

class Checkout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.user.id || '',
      name: this.props.user.name || '',
      email: this.props.user.email || '',
      street: this.props.user.street || '',
      city: this.props.user.city || '',
      state: this.props.user.state || '',
      zip: this.props.user.zip || ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log("this.props",this.props)
    console.log("nextProps",nextProps)
    if (this.props.user.id !== nextProps.user.id) {
      this.setState({id: nextProps.user.id})
      this.setState({name: nextProps.user.name})
      this.setState({email: nextProps.user.email})
      this.setState({street: nextProps.user.street})
      this.setState({city: nextProps.user.city})
      this.setState({state: nextProps.user.state})
      this.setState({zip: nextProps.user.zip})
    }
  }

  componentDidMount() {
    console.log("our component rocked")
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log("============state",this.state)
    console.log("============PROPS==================",this.props)
    if (!Object.keys(this.props.cart).length) return <div>Dwaynius Maxius says you can not checkout without a rock.</div>
    return(<div className="split">
      <div>
      <h1>Checkout</h1>
      { this.props.user.name && `Rocky welcomes you back ${this.props.user.name}` }
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.goPlaceARockOrder(this.state, this.props.cart)
      }}>
      { !this.props.user.id &&
        <fieldset><h3>Guest Details</h3>
        <label>Name 
        <input onChange={this.handleChange} name="name" value={this.state.name} placeholder="Dwaynius Maximus"/></label>
        <label>Email <input onChange={this.handleChange} name="email" value={this.state.email} placeholder="DTRJ@wwe.com"/></label>
        </fieldset>}

      <fieldset><h3>Address</h3>
      <label>Street <input onChange={this.handleChange} name="street" value={this.state.street} placeholder="123 Dwaynius Maximus Lane"/></label>
      <label>City <input onChange={this.handleChange} name="city" value={this.state.city} placeholder="Miami"/></label>
      <label>State <input onChange={this.handleChange} name="state" value={this.state.state} minLength="2" placeholder="FL"/></label>
      <label>Zip Code <input onChange={this.handleChange} name="zip" value={this.state.zip} minLength="5" placeholder="12345"/></label>
      </fieldset>
      <button className="btn btn-success btn-xl" type="submit">Submit Order</button>
      </form></div>
      <div>
        <h1>Cart</h1>
        <p>cart items hsould go hur</p>
        {/*<Cart checkout="true" />*/}
      </div>
      
      </div>)
  }

}

const mapState = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    items: state.items
  }
}

const mapDispatch = (dispatch) => ({
  goPlaceARockOrder(userInfo, products) {
    return dispatch(placeNewOrder(userInfo, products))
  }
})

export default connect(mapState, mapDispatch)(Checkout)
