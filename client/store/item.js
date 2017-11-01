import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ITEMS_FETCHED = 'ITEMS_FETCHED'

/**
 * INITIAL STATE
 */
const defaultItems = {
  items: []
}

/**
 * ACTION CREATORS
 */
const itemsFetched = items => ({type: ITEMS_FETCHED, items});

/**
 * REDUCER
 */
export default function (state = defaultItems, action) {
  const newState = state;

  switch (action.type) {
    case ITEMS_FETCHED:
      newState.items = action.items;
      return newState;
    default:
      return state
  }
}
/**
 * THUNK CREATORS
 */

export const fetchItems = () => {
  console.log('~~~~~~~~~ are we in here?')
  return function thunk (dispatch) {
    axios.get('/api/items')
    .then(res => {
      const items = res.data;
      dispatch(itemsFetched(items));
    })
    .catch(() => console.log('Fetching items unsuccessful'));
  }
}

