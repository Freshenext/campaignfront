import customAxios from "../../customAxios";
import {boostrapAxiosState} from "../../shared/utilities";

const defaultActions = boostrapAxiosState(undefined, 'campaign')[2];

function fetchCampaigns(){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        customAxios.get('/campaigns')
            .then(response => {
                console.log(response.data);
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

const actions = {
...defaultActions,
    fetchCampaigns

}
export default actions;