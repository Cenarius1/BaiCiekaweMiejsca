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
    return (dispatch, getState) => {
        event.preventDefault();

        const currentState = getState().RegisterPage;

        alert(`You typed: ${currentState.login} / ${currentState.password}, displayName: ${currentState.displayName}`);

        dispatch(onResetState());
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