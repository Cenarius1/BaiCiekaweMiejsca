import { request, HTTP_METHOD } from '../../helpers/request';
import { BASE_API_URL } from '../../constants/urls';
import moment from 'moment';
import history from '../../history';

import * as CONSTANTS from './constants';

export const onResetState = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.RESET_STATE
        });
    };
};

export const onSubmitClick = (event) => {
    return async (dispatch, getState) => {
        event.preventDefault();
        dispatch(SetBusyState(true));

        const currentState = getState().EventFormPage;

        const addResult = await request(BASE_API_URL + "/api/events", {
            method: HTTP_METHOD.POST,
            body: JSON.stringify({
                name: currentState.name,
                description: currentState.description,
                localization: {
                    longitude: currentState.longitude,
                    latitude: currentState.latitude
                },
                date: moment(currentState.date, 'YYYY-MM-DD').unix(),
                type: currentState.type
            })
        });

        if (addResult.data.success) {
            alert("Event added sucesfully!");
            history.push("/details/" + addResult.data.data.id);
            console.log("Event added sucesfully!");
        } else {
            alert(addResult.data.errorMessage);
        }

        dispatch(SetBusyState(false));
    };
};

export const onFormUpdate = (field, event) => {
    return (dispatch, getState) => {
        let newValue = "";


        console.log(event.target.value);
        switch (event.target.type) {
            case "checkbox":
                newValue = event.target.checked;
                break;
            default:
                newValue = event.target.value;
        }

        dispatch({
            type: CONSTANTS.UPDATE_FORM_FIELD,
            payload: {
                fieldName: field,
                fieldValue: newValue
            }
        });
    };
};

const SetBusyState = (isBusy) => {
    return (dispatch, getState) => {
        dispatch({ type: CONSTANTS.UPDATE_BUSY_STATUS, payload: { isBusy: isBusy } });
    };
};