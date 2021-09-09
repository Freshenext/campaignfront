import create from 'zustand';
import customAxios from "../customAxios";

const useStore = create((set,get) => ({
    campaigns : [],
    error : "",
    isLoading : false,
    createSuccess : false,
    deleteSuccess : false,
    editSuccess : false,
    categorySearch : '',
    setCategorySearch : searchText => {
        set ({ categorySearch : searchText});
    },
    setEditSuccess : editSuccess => {
        set({ editSuccess});
    },
    setDeleteSuccess : deleteSuccess => {
        set({ deleteSuccess});
    },
    setLoading : (isLoading = false) => {
        set({ isLoading });
    },
    setError : (error = "") => {
        set({ error });
    },
    setCreateSuccess : (createSuccess = false) => {
        set({ createSuccess })
    },
    resetStatus : () => {
        set({ isLoading : false, error : "", createSuccess : false, deleteSuccess : false});
    },
    fetchCampaigns : () => {
        customAxios.get('/campaigns')
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
        formData.append('isMobile', campaignObj.isMobile);
        formData.append('isDesktop', campaignObj.isDesktop);
        formData.append('image', campaignObj.image, campaignObj.image.name);

        return customAxios.post('/campaigns', formData)
            .then(response => {
                get().fetchCampaigns();
                get().setCreateSuccess(true);
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
        formData.append('isMobile', campaignObj.isMobile);
        formData.append('isDesktop', campaignObj.isDesktop);

        if(campaignObj.image){
            formData.append('image', campaignObj.image, campaignObj.image.name);
        }
        return customAxios.put(`/campaigns/${campaignObj.id}`, formData)
            .then(response => {
                get().fetchCampaigns();
                get().setEditSuccess(true);
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
        customAxios.delete(`/campaigns/${id}`)
            .then(( { data }) => {
                get().fetchCampaigns();
                get().setDeleteSuccess(true);
            })
            .catch(err => {

            })
            .finally(() => {

            });
    },
    categories : [],
    fetchCategories : () => {
        customAxios.get('/category/list')
            .then(( {data} ) => {
                set({ categories : data});
            })
    },
    selectedCategory : {},
    setSelectedCategory : selectedCategoryIndex => {
        set({ selectedCategory: {}});
        const newCategories = get().categories.map((category,index) => {
            if(index === selectedCategoryIndex){
                set( {selectedCategory : category});
                return {...category, selected : true}
            } else return {...category, selected : false}
        })
        set( {categories : newCategories});
    }
}));

export default useStore;