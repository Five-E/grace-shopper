import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultItems = []

/* -----------------    ACTION TYPES ------------------ */
const REVIEWS_FETCHED = 'REVIEWS_FETCHED'
const REVIEW_ADDED = 'REVIEW_ADDED'

/* ------------   ACTION CREATORS     ------------------ */
const reviewsFetched = reviews => ({ type: REVIEWS_FETCHED, reviews })
const reviewAdded = review => ({ type: REVIEW_ADDED, review })

export default function (state = defaultItems, action) {
  let newState = state;

  switch (action.type) {
    case REVIEWS_FETCHED:
      return action.reviews
    case REVIEW_ADDED:
      newState = newState.concat(action.review)
      return newState
    default:
      return state
  }
}

/* -----------------   THUNK CREATORS     ------------------ */
export const fetchReviews = () => {
  return function thunk(dispatch) {
    axios.get('/api/reviews')
      .then(res => {
        const reviews = res.data
        dispatch(reviewsFetched(reviews))
      })
      .catch(console.error)
  }
}

export const addReview = (newReview) => {
  return function thunk(dispatch) {
    axios.post('/api/reviews', newReview)
      .then(res => {
        const review = res.data
        dispatch(reviewAdded(review))
      })
      .catch(console.error)
  }
}
