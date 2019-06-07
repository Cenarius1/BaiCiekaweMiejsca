import pages from './pages';

export default {
    [pages.login.NAME]: pages.login.reducer,
    [pages.eventsMap.NAME]: pages.eventsMap.reducer,
    [pages.register.NAME]: pages.register.reducer,
    [pages.eventsList.NAME]: pages.eventsList.reducer,
    [pages.eventDetails.NAME]: pages.eventDetails.reducer,
    [pages.eventForm.NAME]: pages.eventForm.reducer,
    [pages.eventsManage.NAME]: pages.eventsManage.reducer
};