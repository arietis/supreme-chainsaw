import { combineReducers } from 'redux'
import filters, * as fromFilters from './filters'
import tickets, * as fromTickets from './tickets'

export default combineReducers({
  filters,
  tickets
});
