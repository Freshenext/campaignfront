import authConstants from "./authConstants";
const initState = {
    message : '',
    access_token : '',
    refresh_token : '',
    requestStatus : 'idle', // loading, success, error
    error : ''
}

export const authReducer = (state = initState, { type, payload }) => {
    switch(type){
        case authConstants.SET_TOKEN:
            return {
                ...state,
                ...payload
            };
        case authConstants.SET_REQUEST_STATUS:
            return {
                ...state,
                ...payload
            }
        case authConstants.LOGOFF:
            return initState;
        default:
            return state;
    }
}