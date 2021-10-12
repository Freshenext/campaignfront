import {dispatch} from "../storeRedux";
import authConstants from "./authConstants";
import customAxios from "../../shared/customAxios";
import {getFormData} from "../../shared/utilities";

const setRequestLoading = () => {
    dispatch({
        type : authConstants.SET_REQUEST_STATUS,
        payload : {
            requestStatus : 'loading',
            error : ''
        }})
}

const setRequestErrorAxios = axiosError => {
    debugger;
    var error = axiosError.toString();
    if(axiosError.response){
        const errorMessage = axiosError.response.data.message || axiosError.response.data.toString();
        error += ": " + errorMessage;
    }
    setRequestError(error);
}


const setRequestSuccess = () => {
    dispatch({
        type : authConstants.SET_REQUEST_STATUS,
        payload : {
            requestStatus : 'success',
            error : ''
        }})
}

const setRequestError = (error) => {
    dispatch({
        type : authConstants.SET_REQUEST_STATUS,
        payload : {
            requestStatus : 'error',
            error : error
        }})
}

const setToken = (tokenObj) => {
    dispatch({
        type: authConstants.SET_TOKEN,
        payload : tokenObj
    })
}
export const loginUser = ({ username, password }) => {
    setRequestLoading();
    customAxios.post('http://experience-api.sofiapulse.com/api/v1/auth/login', getFormData({ username, password }))
        .then(({data}) => {
            setRequestSuccess();
            setToken({...data, username});
        })
        .catch(err => {
            setRequestErrorAxios(err);
        });
}

export const logoutUser = () => {
    dispatch(dispatch({
        type: authConstants.LOGOFF,
    }))
}