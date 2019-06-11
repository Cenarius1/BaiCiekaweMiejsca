import * as CONSTANTS from './constants';
import { request } from '../../helpers/request';
import { BASE_API_URL } from '../../constants/urls';
import auth from '../../infrastructure/auth';

export const onResetState = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.RESET_STATE
        });
    };
};

export const onGetDetails = (id) => {
    return async (dispatch, getState) => {
        dispatch(setBusy(true));

        const response = await request(BASE_API_URL + "/api/events/" + id, { method: "GET", headers: {}, body: undefined });

        if (response.success) {
            dispatch({
                type: CONSTANTS.GET_DETAILS_SUCCESS,
                payload: {
                    event: response.data.data
                }
            });
        } else {
            alert("There is some problem during obtaining event details, message: " + response.message);
            dispatch({
                type: CONSTANTS.GET_DETAILS_FAIL,
                payload: {
                    message: response.message
                }
            });
        }

        dispatch(setBusy(false));
    };
};

export const onVote = (rate) => {
    return async (dispatch, getState) => {
        dispatch(setBusy(true));

        const currentState = getState().EventDetailsPage;
        const eventId = currentState.event.id;
        const response = await request(BASE_API_URL + "/api/rating", {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                eventId,
                rate
            })
        });

        if (response.success) {
            dispatch(onGetDetails(eventId));
        } else {
            alert("There is some problem during obtaining event details, message: " + response.message);
            dispatch(setBusy(false));
        }
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