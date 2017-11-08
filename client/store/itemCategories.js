import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCategoryId = null

/* -----------------    ACTION TYPES ------------------ */
const ITEM_CATEGORIES_FETCHED = 'ITEM_CATEGORIES_FETCHED'
const ITEM_CATEGORIES_ADDED = 'ITEM_CATEGORIES_ADDED'
const ITEM_CATEGORIES_DELETED = 'ITEM_CATEGORIES_DELETED'

/* ------------   ACTION CREATORS     ------------------ */
export const categoriesFetched = categories => ({type: ITEM_CATEGORIES_FETCHED, categories})
export const categoryAdded = category => ({type: ITEM_CATEGORIES_ADDED, category});
export const categoryDeleted = categoryId => ({type: ITEM_CATEGORIES_DELETED, categoryId})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultCategoryId, action) {
  let newState = state;

  switch (action.type) {
    case ITEM_CATEGORIES_FETCHED:
      newState = action.categories
      return newState

    case ITEM_CATEGORIES_ADDED:
      newState = state.concat(action.category);
      return newState;

    case ITEM_CATEGORIES_DELETED:
      newState = state.filter(category => category.id !== action.categoryId)
      return newState;

    default:
      return state
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchItemCategories = (itemId) => {
  return function thunk (dispatch) {
    axios.get(`/api/items/${itemId}`)
    .then(res => {
      const itemCategories = res.data.categories
      dispatch(categoriesFetched(itemCategories))
    })
    .catch(() => console.log('Fetching itemCategories unsuccessful'))
  }
}

export const addItemCategory = (itemId, categoryId) => {
  return function thunk (dispatch) {
    axios.put(`/api/items/${itemId}/categories`, {id: categoryId})
    .then(res => {
      dispatch(categoryAdded(res.data))
    })
    .catch(() => console.log('Adding itemCategory unsuccessful'))
  }
}

export const deleteItemCategory = (itemId, categoryId) => {
  return function thunk (dispatch) {
    axios.delete(`/api/items/${itemId}/categories`, {data: {id: categoryId}})
    .then(() => {
      dispatch(categoryDeleted(categoryId))
    })
    .catch(() => console.log('Deleting itemCategory unsuccessful'))
  }
}