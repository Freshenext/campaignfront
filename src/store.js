import create from 'zustand';
import customAxios from "./customAxios";

const useStore = create((set,get) => ({
    campaigns : [],
    error : "",
    isLoading : false,
    setLoading : (isLoading = false) => {
        set({ isLoading });
    },
    setError : (error = "") => {
        set({ error });
    },
    resetStatus : () => {
        set({ isLoading : false, error : ""});
    },
    fetchCampaigns : () => {
        customAxios.get('')
            .then(( { data }) => {
                set(state => ({
                    ...state, campaigns : data
                }))
            })
            .catch(err => {

            })
            .finally(() => {

            })
    },
    createCampaign : (campaignObj) => {
        get().resetStatus();
        get().setLoading(true);
        var formData =  new FormData();
        formData.append('name', campaignObj.name);
        formData.append('category', campaignObj.category);
        formData.append('url', campaignObj.url);
        formData.append('image', campaignObj.image, campaignObj.image.name);

        return customAxios.post('', formData)
            .then(response => {
                get().fetchCampaigns();
            })
            .catch(err => {
                get().setError(err.response.data);
            })
            .finally(() => {
                get().setLoading(false);
            });
    },
    editCampaign : (campaignObj) => {
        get().resetStatus();
        get().setLoading(true);
        var formData =  new FormData();
        formData.append('name', campaignObj.name);
        formData.append('category', campaignObj.category);
        formData.append('url', campaignObj.url);
        if(campaignObj.image){
            formData.append('image', campaignObj.image, campaignObj.image.name);
        }
        return customAxios.put(`/${campaignObj.id}`, formData)
            .then(response => {
                get().fetchCampaigns();
            })
            .catch(err => {
                get().setError(err.response.data);
            })
            .finally(() => {
                get().setLoading(false);
            });
    },
    deleteCampaign : id => {
        get().resetStatus();
        customAxios.delete(`/${id}`)
            .then(( { data }) => {
                get().fetchCampaigns();
            })
            .catch(err => {

            })
            .finally(() => {

            });
    }
}));

export default useStore;