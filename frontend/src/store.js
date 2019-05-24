import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (data = {}) => {
    const rootReducer = combineReducers(reducers);

    return createStore(rootReducer, data, applyMiddleware(thunk));
};