
/* -----------------    INITIAL STATE ------------------ */
const defaultCategoryId = null

/* -----------------    ACTION TYPES ------------------ */
const CATEGORY_SELECTED = 'CATEGORY_SELECTED'
const CATEGORY_UNSELECTED = 'CATEGORY_UNSELECTED'

/* ------------   ACTION CREATORS     ------------------ */
export const categorySelected = categoryId => ({type: CATEGORY_SELECTED, categoryId});
export const categoryUnselected = () => ({type: CATEGORY_UNSELECTED})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultCategoryId, action) {
  let newState = state;

  switch (action.type) {
    case CATEGORY_SELECTED:
      newState = action.categoryId;
      return newState;

    case CATEGORY_UNSELECTED:
      return null;

    default:
      return state
  }
}

