import customAxios from "../../customAxios";
import {boostrapAxiosState, getFormData} from "../../shared/utilities";

const defaultActions = boostrapAxiosState(undefined, 'campaign')[2];

function fetchCampaigns(){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        customAxios.get('/campaigns')
            .then(response => {
                dispatch({ type : "campaign/SET_CAMPAIGNS", payload : response.data});
            })
            .catch(err => {
                if(err.response)
                    dispatch(defaultActions.setError(err.response.data));
                else
                    dispatch(defaultActions.setError("Error loading"));

            })
            .finally(() => {
                dispatch(defaultActions.setLoading(false))
            });
    }
}

function createCampaign(newCampaign){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        const formData = getFormData(newCampaign);
        return customAxios.post('/campaigns', formData)
            .then(response => {

            })
            .catch(error => {
                if(error.response)
                    dispatch(defaultActions.setError(error.response.data));
                else dispatch(defaultActions.setError(error.toString()));
            })
            .finally(() => {
                dispatch(defaultActions.setLoading(false));
            })
    }
}

function deleteCampaign(id){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        customAxios.delete(`/campaigns/${id}`)
            .then(res => {
                dispatch(fetchCampaigns());
            })
            .catch(() => {})
            .finally(() => {
                defaultActions.setLoading(false);
            })
    }
}

const actions = {
...defaultActions,
    fetchCampaigns,
    createCampaign,
    deleteCampaign
}
export default actions;