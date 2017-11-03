import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultItems = []

/* -----------------    ACTION TYPES ------------------ */
const ITEMS_FETCHED = 'ITEMS_FETCHED'
const ITEMS_FILTERED_BY_CATEGORY = 'ITEMS_FILTERED_BY_CATEGORY'

/* ------------   ACTION CREATORS     ------------------ */
const itemsFetched = items => ({type: ITEMS_FETCHED, items});
const itemsFilteredByCategory = categoryId => ({type: ITEMS_FILTERED_BY_CATEGORY, categoryId})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultItems, action) {
  let newState = state;

  switch (action.type) {

    case ITEMS_FETCHED:
      newState = action.items;
      return newState;

    case ITEMS_FILTERED_BY_CATEGORY:
      console.log('in TEMS_FILTERED_BY_CATEGORY, state', state)
      newState = state.filter(item => item.categoryId === action.categoryId)
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

export const filterItemsByCategoryId = (categoryId) => {
  return function thunk (dispatch) {
    axios.get('/api/items')
    .then(res => {
      const items = res.data;
      dispatch(itemsFetched(items));
    })
    .then(() => {
      dispatch(itemsFilteredByCategory(categoryId));
    })
    .catch(() => console.log('Fetching items unsuccessful'));
  }
}

