import sales from '../api/sales'
import * as types from '../constants/ActionTypes'

const receiveTickets = tickets => ({
  type: types.RECEIVE_TICKETS,
  tickets
});

export const getAllTickets = () => dispatch => {
  sales.getTickets(tickets => {
    dispatch(receiveTickets(tickets));
  });
};
