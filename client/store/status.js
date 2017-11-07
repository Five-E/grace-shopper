import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultUsers = []

/* -----------------    ACTION TYPES ------------------ */
const STATUSES_FETCHED = 'STATUSES_FETCHED'


/* ------------   ACTION CREATORS     ------------------ */
const statusesFetched = statuses => ({ type: STATUSES_FETCHED, statuses })

/* ------------       REDUCER     ------------------ */
export default function (state = defaultUsers, action) {
  let newState = state;

  switch (action.type) {
    case STATUSES_FETCHED:
      newState = action.statuses
      return newState
    default:
      return state
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchStatuses = () => {
  return function thunk(dispatch) {
    axios.get('/api/status')
      .then(res => {
        const statuses = res.data;
        dispatch(statusesFetched(statuses));
      })
      .catch(() => console.log('Fetching status unsuccessful'));
  }
}

