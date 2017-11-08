import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReviewList extends Component {

  render() {
    const { productId, review, users, name } = this.props
    const reviewsForProduct = review.filter(review => review.itemId === productId)

    return (
      <div>
        <h2>Reviews for {name}</h2>
        <div>
          {reviewsForProduct.map(rev => {
            return (
              <div key={rev.id}>
                <h5>{users.find(user => rev.userId === user.id).name}</h5>
                <h6>{rev.rating}</h6>
                <p>{rev.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    review: state.review,
    users: state.users
  }
}
const mapDispatch = null
export default connect(mapState, mapDispatch)(ReviewList)
