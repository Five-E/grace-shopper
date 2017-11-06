import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultItems = []

/* -----------------    ACTION TYPES ------------------ */
const ITEMS_FETCHED = 'ITEMS_FETCHED'
const ITEM_ADDED = 'ITEM_ADDED'
const ITEM_UPDATED = 'ITEM_UPDATED'
const ITEM_DELETED = 'ITEM_DELETED'

/* ------------   ACTION CREATORS     ------------------ */
const itemsFetched = items => ({ type: ITEMS_FETCHED, items })

const itemAdded = item => ({ type: ITEM_ADDED, item })

const itemUpdated = item => ({ type: ITEM_UPDATED, item })

const itemDeleted = itemId => ({ type: ITEM_DELETED, itemId })

/* ------------       REDUCER     ------------------ */
export default function (state = defaultItems, action) {
  let newState = state;

  switch (action.type) {

    case ITEMS_FETCHED:
      newState = action.items
      return newState
    case ITEM_ADDED:
      newState = newState.concat(action.item)
      return newState
    case ITEM_UPDATED:
      newState = newState.filter(item => item.id !== action.item.id)
      newState = newState.concat(action.item)
      return newState
    case ITEM_DELETED:
      newState = newState.filter(item => item.id !== action.itemId)
      return newState
    default:
      return state
  }
}


/* ------------   THUNK CREATORS     ------------------ */
export const fetchItems = () => {
  return function thunk(dispatch) {
    axios.get('/api/items')
      .then(res => {
        const items = res.data;
        dispatch(itemsFetched(items));
      })
      .catch(() => console.log('Fetching items unsuccessful'));
  }
}

export const addItem = (newItem) => {
  return function thunk(dispatch) {
    axios.post('/api/items', newItem)
      .then(res => {
        dispatch(itemAdded(res.data));
      })
      .catch(() => console.log('Adding item unsuccessful'));
  }
}

export const updateItem = (item) => {
  return function thunk(dispatch) {
    axios.put(`/api/items/${item.id}`, item)
      .then(res => {
        const updatedItem = res.data[1][0]
        dispatch(itemUpdated(updatedItem));
      })
      .catch(() => console.log('Updating item unsuccessful'));
  }
}


export const deleteItem = (itemId) => {
  return function thunk(dispatch) {
    dispatch(itemDeleted(itemId));
    axios.delete(`/api/items/${itemId}`)
      .catch(() => console.log('Updating item unsuccessful'));
  }
}
