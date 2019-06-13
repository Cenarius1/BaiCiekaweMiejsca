import { handleActions } from 'redux-actions';
import * as CONSTANTS from './constants';

const initialState = {
    isBusy: false,
    name: "",
    description: "",
    longitude: "",
    latitude: "",
    date: "",
    type: ""
};

export default handleActions({
    [CONSTANTS.RESET_STATE]: (state, action) => {
        return { ...initialState };
    },
    [CONSTANTS.UPDATE_FORM_FIELD]: (state, action) => {
        return {
            ...state,
            [action.payload.fieldName]: action.payload.fieldValue
        };
    },
    [CONSTANTS.UPDATE_BUSY_STATUS]: (state, action) => {
        return { ...state, isBusy: action.payload.isBusy };
    },
}, initialState);