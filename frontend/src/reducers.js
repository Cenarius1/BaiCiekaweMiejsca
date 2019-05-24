import pages from './pages';

export default {
    [pages.login.NAME]: pages.login.reducer,
    [pages.map.NAME]: pages.map.reducer
};