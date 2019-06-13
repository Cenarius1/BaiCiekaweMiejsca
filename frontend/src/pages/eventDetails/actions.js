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

        dispatch(onGetWeather());
    };
};

export const onGetWeather = () => {
    return async (dispatch, getState) => {
        const currentState = getState().EventDetailsPage;
        const longitude = currentState.event.localization.longitude;
        const latitude = currentState.event.localization.latitude;
        try {
            const response = await request(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=90e0cff7b403e125642704f4c61af12c`, { method: "GET", headers: {}, body: undefined });
            console.log(JSON.stringify(response));
            const data = {
                name: response.data.name,
                weather: {
                    main: response.data.weather[0].main,
                    description: response.data.weather[0].description
                },
                temperature: {
                    min: response.data.main.temp_min,
                    max: response.data.main.temp_max,
                    temp: response.data.main.temp
                },
                windSpeed: response.data.wind.speed,
            };

            dispatch({
                type: CONSTANTS.WEATHER_LOADED_SUCCESS,
                payload: {
                    weather: data
                }
            });
        } catch (err) {
            alert("Error obtaining weather, message: " + err.message);
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