import * as CONSTANTS from './constants';
import history from '../../history';
import { request } from '../../helpers/request';
import { BASE_API_URL } from "../../constants/urls";

export const onResetState = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.RESET_STATE
        });
    };
};

export const onEventClick = (id) => {
    return (dispatch, getState) => {
        history.push("/details/" + id);
    };
};

export const onLoadEvents = () => {
    return async (dispatch, getState) => {
        dispatch(setBusy(true));

        const requestResponse = await request(BASE_API_URL + "/api/events", { method: "GET", headers: {}, body: {} });

        if (requestResponse.success) {
            dispatch({
                type: CONSTANTS.EVENTS_LOADED_SUCCESS,
                payload: {
                    events: requestResponse.data.data
                }
            });
        } else {
            alert("Error occurred during requesting events, message: " + requestResponse.message);
            dispatch({
                type: CONSTANTS.EVENTS_LOADED_FAIL,
                payload: {
                    errorMessage: requestResponse.message
                }
            });
        }

        dispatch(setBusy(false));
    };
};

const setBusy = (isBusy) => {
    return async (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.SET_BUSY,
            payload: {
                isBusy: isBusy
            }
        });
    };
};