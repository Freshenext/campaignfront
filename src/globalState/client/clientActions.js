import customAxios from "../../shared/customAxios";
import { dispatch } from "../storeRedux";
import clientConstants from "./clientConstants";
import {getFormData, returnAxiosPromiseError} from "../../shared/utilities";
import {setCampaigns} from "../campaigns/campaignActions";
import {setCategories} from "../categories/categoriesActions";

export const fetchClients = () => {
    return customAxios.get('/client')
        .then(({data}) => {
            dispatch({
                type: clientConstants.SET_CLIENTS,
                payload : data
            })
        })
}

export const setSuccessMessage = () => {
    dispatch({
        type: clientConstants.SET_SUCCESS_MESSAGE,
        payload : 'Action completed successfully.'
    });

    setTimeout(() => {
        dispatch({
            type: clientConstants.SET_SUCCESS_MESSAGE,
            payload : ''
        })
    }, 5000);
}
export const insertClient = ({ name, url }) => {
    return customAxios.post('/client', getFormData({ name, url}))
        .then(data => {
            fetchClients();
            setSuccessMessage();
        })
        .catch(error => {
            return returnAxiosPromiseError(error);
        });
}

export const updateClient = ({ id, name, url }) => {
    return customAxios.put(`/client/${id}`, getFormData({name, url}))
        .then((data) => {
            fetchClients();
            setSuccessMessage();
        })
        .catch(error => {
            return returnAxiosPromiseError(error);
        });
}

export const fetchClientCampaigns = (clientId) => {
    return customAxios.get(`/campaigns/client/${clientId}`)
        .then(data => {
            setCampaigns(data);
            return data;
        })
        .catch(error => {
            return returnAxiosPromiseError(error);
        })
}

export const fetchClientCampaignsCategories = (clientUrl) => {
    return customAxios.get(`/campaigns/client/${clientUrl}/all`)
        .then(({data}) => {
            setCampaigns(data.campaigns);
            setCategories(data.categories);
            return data;
        })
        .catch(error => {
            return returnAxiosPromiseError(error);
        })
}
