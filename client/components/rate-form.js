import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../store/review'

class RateForm extends Component {
  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
    this.fiveStarRating = this.fiveStarRating.bind(this)
  }

  submitHandler(event) {
    event.preventDefault();
    const rating = event.target.rating.value
    const content = event.target.description.value
    const itemId = +this.props.match.params.itemId
    const userId = +this.props.user.id
    const review = { rating, content, itemId, userId }
    this.props.addNewRating(review)
  }

  fiveStarRating() {
    let ratings = []
    for (let i = 1; i <= 5; i++) {
      ratings.push(i)
    }
    return ratings.map(idx => <option key={idx}>{idx}</option>);
  }

  render() {
    if (!this.props) return <div>Loading>... </div>

    return (
      <form onSubmit={this.submitHandler}>
        <div className="form-group">
          <label>Rating</label>
          <select name="rating" className="form-control">
            {this.fiveStarRating()}
          </select>
        </div>
        <div className="form-group">
          <label>The Rock Demands You ELBOW DROP A Description</label>
          <textarea name="description" className="form-control" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addNewRating(review) {
      dispatch(addReview(review))
    }
  }
}

export default connect(mapState, mapDispatch)(RateForm)
