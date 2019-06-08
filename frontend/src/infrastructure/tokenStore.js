export const set = (token) => {
    localStorage.setItem("bearer_token", token);
};

export const get = () => {
    return localStorage.getItem("bearer_token");
};

export const remove = () => {
    localStorage.removeItem("bearer_token");
};



export default {
    set,
    get,
    remove
};