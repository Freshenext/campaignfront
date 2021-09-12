import customAxios from "../../customAxios";
import {boostrapAxiosState, getFormData} from "../../shared/utilities";

const defaultActions = boostrapAxiosState(undefined, 'category')[2];

function fetchCategories(){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        customAxios.get('/category')
            .then(response => {
                console.log(response.data);
                dispatch({ type : "category/SET_CATEGORIES", payload : response.data});
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

function createCategory(newCategory){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        const formData = getFormData(newCategory);
        return customAxios.post('/category', formData)
            .then(response => {
                dispatch(fetchCategories());
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

function deleteCategory(id){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        customAxios.delete(`/category/${id}`)
            .then(() => {
                dispatch(fetchCategories());
            })
            .catch(err => {

            })
            .finally(() => {
                defaultActions.setLoading(false);
            })
    }
}

function setSelectedCategory(selectedCategory){
    console.log("WTF");
    return {
        'type' : 'category/SET_SELECTED_CATEGORY',
        payload : selectedCategory
    }
}

const categoryActions = {
    ...defaultActions,
    fetchCategories,
    createCategory,
    deleteCategory,
    setSelectedCategory
}
export default categoryActions;