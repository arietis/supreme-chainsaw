import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk);

export const ticketsReducer = (state={}, action) => { return {}
};

export default function configureStore(initialState) {
    return createStore(ticketsReducer, initialState, enhancer)
}
