import { handleActions } from 'redux-actions';
import * as CONSTANTS from './constants';

const initialState = {
    events: [],
    isBusy: false
};

export default handleActions({
    [CONSTANTS.RESET_STATE]: (state, action) => {
        return { ...initialState };
    },
    [CONSTANTS.EVENTS_LOADED_SUCCESS]: (state, action) => {
        return { ...state, events: [...action.payload.events] };
    },
    [CONSTANTS.SET_BUSY]: (state, action) => {
        return { ...state, isBusy: action.payload.isBusy };
    }
}, initialState);