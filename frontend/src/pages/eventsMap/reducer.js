import { handleActions } from 'redux-actions';
import * as CONSTANTS from './constants';

const initialState = {
    events: [],
    initialPoint: {
        lng: 0,
        lat: 0
    },
    isBusy: true
};

export default handleActions({
    [CONSTANTS.RESET_STATE]: (state, action) => {
        return { ...initialState };
    },
    [CONSTANTS.GET_EVENTS_SUCCESS]: (state, action) => {
        return { ...state, events: action.payload.events };
    },
    [CONSTANTS.UPDATE_INITIAL_POINT]: (state, action) => {
        return { ...state, initialPoint: { ...action.payload.point } };
    },
    [CONSTANTS.SET_BUSY]: (state, action) => {
        return { ...state, isBusy: action.payload.isBusy };
    },
}, initialState);