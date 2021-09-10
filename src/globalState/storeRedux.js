import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {campaignReducer} from "./campaigns/campaignReducer";
import {categoriesReducer} from "./categories/categoriesReducer";

const rootReducer = combineReducers({
    campaign : campaignReducer,
    category : categoriesReducer
}
);
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;