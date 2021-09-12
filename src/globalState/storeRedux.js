import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import {campaignReducer} from "./campaigns/campaignReducer";
import {categoriesReducer} from "./categories/categoriesReducer";

const rootReducer = combineReducers({
    campaign : campaignReducer,
    category : categoriesReducer
}
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;