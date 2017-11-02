import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultCategories = []

/* -----------------    ACTION TYPES ------------------ */
const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED'

/* ------------   ACTION CREATORS     ------------------ */
const categoriesFetched = categories => ({type: CATEGORIES_FETCHED, categories});

/* ------------       REDUCER     ------------------ */
export default function (state = defaultCategories, action) {
  let newState = state;

  switch (action.type) {
    case CATEGORIES_FETCHED:
      newState = action.categories;
      return newState;
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

