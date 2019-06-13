import history from '../../history';
import { BASE_API_URL } from '../../constants/urls';
import * as tokenStore from '../../infrastructure/tokenStore';
import { request, HTTP_METHOD } from '../../helpers/request';

import * as CONSTANTS from './constants';

export const onResetState = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.RESET_STATE
        });
    };
};

export const onCheckAuthericated = () => {
    return async (dispatch, getState) => {
        const token = tokenStore.get();

        if (token) {
            console.log("User is authericated, navigating to maps");
            history.replace("/map");
        }
    };
};

export const onSubmitClick = (event) => {
    return async (dispatch, getState) => {
        event.preventDefault();
        dispatch(SetBusyState(true));

        const currentState = getState().LoginPage;

        const loginResult = await request(BASE_API_URL + "/api/auth/login-local", {
            method: HTTP_METHOD.POST,
            body: JSON.stringify({
                username: currentState.login,
                password: currentState.password,
            })
        });

        if (loginResult.success) {
            if (loginResult.data.success) {
                if (loginResult.data.data.token) {
                    tokenStore.set(loginResult.data.data.token);
                }
                history.replace("/map");
            } else {
                alert(loginResult.data.errorMessage);
            }
        } else {
            alert("Error occured during authorization process, error: " + loginResult.message);
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