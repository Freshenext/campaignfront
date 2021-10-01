import customAxios from "../../shared/customAxios";
import {dispatch} from "../storeRedux";
import {returnAxiosPromiseError} from "../../shared/utilities";

const baseURL = 'http://experience-api.sofiapulse.com/api/v1/parameters';


export const fetchCategories = () => {
    return customAxios.get(baseURL)
        .then(({ data: parameters }) => {
            const categories = parameters.find(param => param.param_key === 'demo_category')?.param_value || [];
            dispatch({ type : 'category/SET_CATEGORIES', payload: categories});
        })
        .catch(error => {
            return returnAxiosPromiseError(error);
        })
}