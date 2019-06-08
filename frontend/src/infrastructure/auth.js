import tokenStore from './tokenStore';
import jwt from 'jsonwebtoken';
import history from '../history';

const getUser = () => {
    const token = tokenStore.get();

    if (!token) {
        console.warn("Attempt to decode JWT Token that does not exist!");
        return null;
    }

    const tokenData = jwt.decode(token);

    const user = {
        id: tokenData.id,
        vendor: tokenData.vendor,
        displayName: tokenData.displayName,
        facebookId: tokenData.facebookId,
        username: tokenData.username
    };

    return user;
};

const navigateToAppIfAuthericated = () => {
    const token = tokenStore.get();

    if (token) {
        history.replace("/map");
    }
};

const navigateToLoginIfNotAuthericated = () => {
    const token = tokenStore.get();

    if (!token) {
        history.replace("/");
    }
};

const login = (token) => {
    tokenStore.set(token);
};

const logout = () => {
    tokenStore.remove();
};

export default {
    getUser,
    login,
    logout,
    navigateToAppIfAuthericated,
    navigateToLoginIfNotAuthericated
};