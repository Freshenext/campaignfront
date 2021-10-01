import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import {campaignReducer} from "./campaigns/campaignReducer";
import {categoriesReducer} from "./categories/categoriesReducer";
import { clientReducer } from "./client/clientReducer";
import {authReducer} from "./auth/authReducer";
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

const persistConfig = {
    key : 'root',
    storage : localStorage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    campaign : campaignReducer,
    category : categoriesReducer,
    auth : authReducer,
    client : clientReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(thunk)
));
export const persistor = persistStore(store);

export default store;

export const {dispatch} = store;