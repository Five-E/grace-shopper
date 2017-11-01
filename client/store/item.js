import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultItems = []

/* -----------------    ACTION TYPES ------------------ */
const ITEMS_FETCHED = 'ITEMS_FETCHED'

/* ------------   ACTION CREATORS     ------------------ */
const itemsFetched = items => ({type: ITEMS_FETCHED, items});

/* ------------       REDUCER     ------------------ */
export default function (state = defaultItems, action) {
  let newState = state;

  switch (action.type) {
    case ITEMS_FETCHED:
      newState = action.items;
      return newState;
    default:
      return state
  }
}


/* ------------   THUNK CREATORS     ------------------ */
export const fetchItems = () => {
  return function thunk (dispatch) {
    axios.get('/api/items')
    .then(res => {
      const items = res.data;
      dispatch(itemsFetched(items));
    })
    .catch(() => console.log('Fetching items unsuccessful'));
  }
}

