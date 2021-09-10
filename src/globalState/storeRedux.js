import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {campaignReducer} from "./campaigns/campaignReducer";

const rootReducer = combineReducers({
    campaign : campaignReducer
}
);
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;