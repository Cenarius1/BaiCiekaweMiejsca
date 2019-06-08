import history from '../../history';
import * as tokenStore from '../../infrastructure/tokenStore';
import { request, HTTP_METHOD } from '../../helpers/request';
import { BASE_API_URL } from '../../constants/urls';

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

        const currentState = getState().RegisterPage;

        const registerResult = await request(BASE_API_URL + "/api/auth/register-local", {
            method: HTTP_METHOD.POST,
            body: JSON.stringify({
                username: currentState.login,
                password: currentState.password,
                displayName: currentState.displayName
            })
        });

        if (registerResult.data.success) {
            alert("You has been sucesfully registered");

            if (registerResult.data.data.token) {
                tokenStore.set(registerResult.data.data.token);
            }
            history.replace("/map");
        } else {
            alert(registerResult.data.errorMessage);
        }

        dispatch(SetBusyState(false));
    };
};

export const onFormUpdate = (field, event) => {
    return (dispatch, getState) => {
        let newValue = "";

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