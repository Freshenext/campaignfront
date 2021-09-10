// import create from 'zustand';
// import customAxios from "../customAxios";
//
// import {campaignActions} from "./campaigns/campaignActions";
//
//
// const useStore = create((set,get) => ({
//
//     campaignActions : {...campaignActions(get, set, 'campaign')},
//     categorySearch : '',
//     setCategorySearch : searchText => {
//         set ({ categorySearch : searchText});
//     },
//     createCampaign : (campaignObj) => {
//         get().resetStatus();
//         get().setLoading(true);
//         var formData =  new FormData();
//         formData.append('name', campaignObj.name);
//         formData.append('category', campaignObj.category);
//         formData.append('url', campaignObj.url);
//         formData.append('isMobile', campaignObj.isMobile);
//         formData.append('isDesktop', campaignObj.isDesktop);
//         formData.append('image', campaignObj.image, campaignObj.image.name);
//
//         return customAxios.post('/campaigns', formData)
//             .then(response => {
//                 get().fetchCampaigns();
//                 get().setCreateSuccess(true);
//             })
//             .catch(err => {
//                 get().setError(err.response.data);
//             })
//             .finally(() => {
//                 get().setLoading(false);
//             });
//     },
//     editCampaign : (campaignObj) => {
//         get().resetStatus();
//         get().setLoading(true);
//         var formData =  new FormData();
//         formData.append('name', campaignObj.name);
//         formData.append('category', campaignObj.category);
//         formData.append('url', campaignObj.url);
//         formData.append('isMobile', campaignObj.isMobile);
//         formData.append('isDesktop', campaignObj.isDesktop);
//
//         if(campaignObj.image){
//             formData.append('image', campaignObj.image, campaignObj.image.name);
//         }
//         return customAxios.put(`/campaigns/${campaignObj.id}`, formData)
//             .then(response => {
//                 get().fetchCampaigns();
//                 get().setEditSuccess(true);
//             })
//             .catch(err => {
//                 get().setError(err.response.data);
//             })
//             .finally(() => {
//                 get().setLoading(false);
//             });
//     },
//     deleteCampaign : id => {
//         get().resetStatus();
//         customAxios.delete(`/campaigns/${id}`)
//             .then(( { data }) => {
//                 get().fetchCampaigns();
//                 get().setDeleteSuccess(true);
//             })
//             .catch(err => {
//
//             })
//             .finally(() => {
//
//             });
//     },
//     categories : [],
//     fetchCategories : () => {
//         customAxios.get('/category/list')
//             .then(( {data} ) => {
//                 set({ categories : data});
//             })
//     },
//     selectedCategory : {},
//     setSelectedCategory : selectedCategoryIndex => {
//         set({ selectedCategory: {}});
//         const newCategories = get().categories.map((category,index) => {
//             if(index === selectedCategoryIndex){
//                 set( {selectedCategory : category});
//                 return {...category, selected : true}
//             } else return {...category, selected : false}
//         })
//         set( {categories : newCategories});
//     }
// }));
//
// export default useStore;