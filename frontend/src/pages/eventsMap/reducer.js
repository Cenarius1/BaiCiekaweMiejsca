import { handleActions } from 'redux-actions';
import * as CONSTANTS from './constants';

const initialState = {

};

export default handleActions({
    [CONSTANTS.RESET_STATE]: (state, action) => {
        return { ...initialState };
    },
}, initialState);