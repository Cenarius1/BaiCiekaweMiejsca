import { handleActions } from 'redux-actions';
import * as CONSTANTS from './constants';

const initialState = {
    isBusy: true,
    event: {
        id: "",
        name: "",
        description: "",
        localization: {
            longitude: 0,
            latitude: 0
        },
        date: 0,
        type: "",
        user: {
            id: "",
            displayName: ""
        },
        rating: {
            count: 0,
            average: 0,
            rated: true
        }
    }
};

export default handleActions({
    [CONSTANTS.RESET_STATE]: (state, action) => {
        return { ...initialState };
    },
    [CONSTANTS.SET_BUSY]: (state, action) => {
        return { ...state, isBusy: action.payload.isBusy };
    },
    [CONSTANTS.GET_DETAILS_SUCCESS]: (state, action) => {
        return { ...state, event: action.payload.event };
    }
}, initialState);