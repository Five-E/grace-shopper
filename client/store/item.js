import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultItems = []

/* -----------------    ACTION TYPES ------------------ */
const ITEMS_FETCHED = 'ITEMS_FETCHED'
const ITEM_ADDED = 'ITEM_ADDED'

/* ------------   ACTION CREATORS     ------------------ */
const itemsFetched = items => ({type: ITEMS_FETCHED, items});

const itemAdded = item => ({type: ITEM_ADDED, item});

/* ------------       REDUCER     ------------------ */
export default function (state = defaultItems, action) {
  let newState = state;

  switch (action.type) {

    case ITEMS_FETCHED:
      newState = action.items;
      return newState;

    case ITEM_ADDED:
      newState = newState.concat(action.item);
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

export const addItem = (newItem) => {
  return function thunk (dispatch) {
    axios.post('/api/items', newItem)
    .then(res => {
      dispatch(itemAdded(res.data));
    })
    .catch(() => console.log('Adding item unsuccessful'));
  }
}

