import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCategories = []

/* -----------------    ACTION TYPES ------------------ */
const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED'
const CATEGORY_ADDED = 'CATEGORY_ADDED'
const CATEGORY_DELETED = 'CATEGORY_DELETED'


/* ------------   ACTION CREATORS     ------------------ */
const categoriesFetched = categories => ({type: CATEGORIES_FETCHED, categories})

const categoryAdded = category => ({ type: CATEGORY_ADDED, category })

const categoryDeleted = categoryId => ({type: CATEGORY_DELETED, categoryId})


/* ------------       REDUCER     ------------------ */
export default function (state = defaultCategories, action) {
  let newState = state;

  switch (action.type) {

    case CATEGORIES_FETCHED:
      newState = action.categories;
      return newState
    case CATEGORY_ADDED:
      newState = newState.concat(action.category)
      return newState
    case CATEGORY_DELETED:
      newState = newState.filter(category => category.id === action.categoryId)
      return newState
    default:
      return state
  }
}


/* ------------   THUNK CREATORS     ------------------ */
export const fetchCategories = () => {
  return function thunk (dispatch) {
    axios.get('/api/categories')
    .then(res => {
      const categories = res.data;
      dispatch(categoriesFetched(categories));
    })
    .catch(() => console.log('Fetching categories unsuccessful'));
  }
}

export const addCategory = (newCategory) => {
  return function thunk (dispatch) {
    axios.post('/api/categories', newCategory)
    .then(res => {
      dispatch(categoryAdded(res.data));
    })
    .catch(() => console.log('Creating category unsuccessful'));    
  }
}

export const deleteCategory = (categoryId) => {
  return function thunk(dispatch) {
    dispatch(categoryDeleted(categoryId));
    axios.delete(`/api/categories/${categoryId}`)
      .catch(() => console.log('Updating category unsuccessful'));
  }
}

