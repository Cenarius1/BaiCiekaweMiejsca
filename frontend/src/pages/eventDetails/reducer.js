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
    }, 
    weather: {
        name: "",
        weather: {
            main: "",
            description: ""
        },
        temperature: {
            min: 0,
            max: 0,
            temp: 0
        },
        windSpeed: 0,
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
    },
    [CONSTANTS.WEATHER_LOADED_SUCCESS]: (state, action) => {
        return { ...state, weather: action.payload.weather };
    }
}, initialState);