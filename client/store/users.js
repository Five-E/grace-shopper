import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultUsers = []

/* -----------------    ACTION TYPES ------------------ */
const USERS_FETCHED = 'USERS_FETCHED'
const USER_UPDATED = 'USER_UPDATED'
const USER_DELETED = 'USER_DELETED'

/* ------------   ACTION CREATORS     ------------------ */
const usersFetched = users => ({ type: USERS_FETCHED, users })

const userUpdated = user => ({ type: USER_UPDATED, user })

const userDeleted = userId => ({ type: USER_DELETED, userId })

/* ------------       REDUCER     ------------------ */
export default function (state = defaultUsers, action) {
  let newState = state;

  switch (action.type) {
    case USERS_FETCHED:
      newState = action.users
      return newState
    case USER_UPDATED:
      newState = newState.filter(user => user.id !== action.user.id)
      newState = newState.concat(action.user)
      return newState
    case USER_DELETED:
      newState = newState.filter(user => user.id !== action.userId)
      return newState
    default:
      return state
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchUsers = () => {
  return function thunk(dispatch) {
    axios.get('/api/users')
      .then(res => {
        const users = res.data;
        dispatch(usersFetched(users));
      })
      .catch(() => console.log('Fetching users unsuccessful'));
  }
}

export const updateUser = (user) => {
  return function thunk(dispatch) {
    axios.put(`/api/users/${user.id}`, user)
      .then(res => {
        const updatedUser = res.data[1][0]
        dispatch(userUpdated(updatedUser));
      })
      .catch(() => console.log('Updating user unsuccessful'));
  }
}

export const deleteUser = (userId) => {
  return function thunk(dispatch) {
    axios.delete(`/api/users/${userId}`)
      .then(() => { dispatch(userDeleted(userId)); })
      .catch(() => console.log('Deleting user unsuccessful'));
  }
}
