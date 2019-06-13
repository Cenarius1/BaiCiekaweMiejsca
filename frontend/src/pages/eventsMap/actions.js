import * as CONSTANTS from './constants';
import { BASE_API_URL } from '../../constants/urls';
import { request } from '../../helpers/request';
import history from '../../history';

export const onResetState = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.RESET_STATE
        });
    };
};

export const onGetEvents = () => {
    return async (dispatch, getState) => {
        dispatch(SetBusyState(true));

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch({
                    type: CONSTANTS.UPDATE_INITIAL_POINT,
                    payload: {
                        point: {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude
                        }
                    }
                });
            });
        }

        const response = await request(BASE_API_URL + "/api/events", { method: "GET", headers: {}, body: {} });

        if (response.success) {
            dispatch({
                type: CONSTANTS.GET_EVENTS_SUCCESS,
                payload: {
                    events: response.data.data
                }
            });
        }

        dispatch(SetBusyState(false));
    };
};

export const onNavigateToDetails = (id) => {
    return async (dispatch, getState) => {
        history.push("/details/" + id);
    }
}

const SetBusyState = (isBusy) => {
    return (dispatch, getState) => {
        dispatch({ type: CONSTANTS.SET_BUSY, payload: { isBusy: isBusy } });
    };
};