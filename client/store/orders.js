import axios from 'axios'

/* -----------------    INITIAL STATE ------------------ */
const defaultOrders = []

/* -----------------    ACTION TYPES ------------------ */
const ORDERS_FETCHED = 'ORDERS_FETCHED'

/* ------------   ACTION CREATORS     ------------------ */
const ordersFetched = orders => ({type: ORDERS_FETCHED, orders});

/* ------------       REDUCER     ------------------ */
export default function (state = defaultOrders, action) {
  let newState = state;

  switch (action.type) {
    case ORDERS_FETCHED:
      newState = action.orders;
      return newState;
    default:
      return state
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchOrders = () => {
  return function thunk (dispatch) {
    axios.get('/api/orders')
    .then(res => {
      const orders = res.data;
      console.log('orders', orders);
      dispatch(ordersFetched(orders));
    })
    .catch(() => console.log('Fetching orders unsuccessful'));
  }
}

