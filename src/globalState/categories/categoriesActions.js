import customAxios from "../../shared/customAxios";
import {boostrapAxiosState, getFormData} from "../../shared/utilities";
import store, {dispatch} from "../storeRedux";

const defaultActions = boostrapAxiosState(undefined, 'category')[2];

function setCategorySearch(text){
    store.dispatch({
        type : "category/SET_SEARCH_CATEGORY",
        payload : text
    });
}

function fetchCategories(){
    return dispatch => {
        dispatch(defaultActions.setLoading(true));
        customAxios.get('/category')
            .then(response => {
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

export function setCategories(categories){
    dispatch({ type : 'category/SET_CATEGORIES', payload : categories });
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
    setSelectedCategory,
    setCategorySearch
}
export default categoryActions;