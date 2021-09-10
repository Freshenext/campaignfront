import {boostrapAxiosState, boostrapReducer} from "../../shared/utilities";

const initState = {
    categories : [],
    ...boostrapAxiosState()[0]
}



export function categoriesReducer(state =initState, {type,payload}){
    const extraReducerObjectFunctions = {
        "category/SET_CATEGORIES" : payload => {
            return {
                ...state, categories : payload
            }
        }
    }
    return boostrapReducer(type, payload,state, initState, extraReducerObjectFunctions);
}