import {boostrapAxiosState, boostrapReducer} from "../../shared/utilities";

const initState = {
    categories : [],
    selectedCategory : {},
    categorySearch : "",
    ...boostrapAxiosState()[0]
}



export function categoriesReducer(state =initState, {type,payload}){
    const extraReducerObjectFunctions = {
        "category/SET_CATEGORIES" : payload => {
            return {
                ...state, categories : payload
            }
        },
        "category/SET_SELECTED_CATEGORY" : payload => {
            return {
                ...state, selectedCategory : payload
            }
        },
        "category/SET_SEARCH_CATEGORY" : payload => {
            return {
                ...state, categorySearch : payload
            }
        }
    }
    return boostrapReducer(type, payload,state, initState, extraReducerObjectFunctions);
}