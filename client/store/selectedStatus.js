
/* -----------------    INITIAL STATE ------------------ */
const defaultStatusName = null

/* -----------------    ACTION TYPES ------------------ */
const STATUS_SELECTED = 'STATUS_SELECTED'
const STATUS_UNSELECTED = 'STATUS_UNSELECTED'

/* ------------   ACTION CREATORS     ------------------ */
export const statusSelected = statusName => ({type: STATUS_SELECTED, statusName});
export const statusUnselected = () => ({type: STATUS_UNSELECTED})

/* ------------       REDUCER     ------------------ */
export default function (state = defaultStatusName, action) {
  let newState = state;

  switch (action.type) {
    case STATUS_SELECTED:
      newState = action.statusName;
      return newState;
    case STATUS_UNSELECTED:
      return null;
    default:
      return state
  }
}
