import {boostrapAxiosState, boostrapReducer} from "../../shared/utilities";

const initState = {
    campaigns : [],
    ...boostrapAxiosState()[0]
}



export function campaignReducer(state =initState, {type,payload}){
    const extraReducerObjectFunctions = {
        "campaign/SET_CAMPAIGNS" : payload => {
            return {
                ...state, campaigns : payload
            }
        }
    }
    return boostrapReducer(type, payload,state, initState, extraReducerObjectFunctions);
}