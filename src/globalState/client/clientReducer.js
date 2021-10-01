import clientConstants from "./clientConstants";

const initState = {
    clients : [],
    request: 'idle', // loading, error, success
    error: '',
    successMessage : ''
}

export const clientReducer = (state = initState, { type, payload }) => {
    switch(type){
        case clientConstants.SET_CLIENTS:
            return { ...state, clients: payload };
        case clientConstants.SET_SUCCESS_MESSAGE:
            return { ...state, successMessage: payload };
        default:
            return state;

    }
}