export function boostrapAxiosState(state = undefined, nameOfObject = ''){
    const stateObjects = {
        error : "",
        isLoading : false,
        createSuccess : false,
        editSuccess : false,
        deleteSuccess: false
    }

    const actionNames = {
        SET_CREATE_SUCCESS : `${nameOfObject}/SET_CREATE_SUCCESS`,
        SET_EDIT_SUCCESS : `${nameOfObject}/SET_EDIT_SUCCESS`,
        SET_DELETE_SUCCESS : `${nameOfObject}/SET_DELETE_SUCCESS`,
        SET_LOADING : `${nameOfObject}/SET_LOADING`,
        SET_ERROR : `${nameOfObject}/SET_ERROR`,
        RESET_STATUS : `${nameOfObject}/RESET_STATUS`
    }

    const functions = {
        [actionNames.SET_CREATE_SUCCESS] : (payload = true) => {
            return {
                ...state, createSuccess : payload
            }
        },
        [actionNames.SET_EDIT_SUCCESS]: (payload = true) => {
            return {
                ...state, editSuccess: payload
            }
        },
        [actionNames.SET_DELETE_SUCCESS]: (payload = true) => {
            return {
                ...state, deleteSuccess : payload
            }
        },
        [actionNames.SET_LOADING]: (isLoading = false) => {
            return {
                ...state, isLoading
            }
        },
        [actionNames.SET_ERROR]: (error = "") => {
            return {
                ...state, error
            }

        },
        [actionNames.RESET_STATUS]: () => {
            return {
                ...state,
                error : '',
                isLoading: false,
                createSuccess: false,
                editSuccess: false,
                deleteSuccess: false
            }
        },
    };

    const actions = {
        setCreateSuccess : (payload) => {
            return {
                type : actionNames.SET_CREATE_SUCCESS,
                payload
            }
        },
        setEditSuccess : (payload) => {
            return {
                type : actionNames.SET_EDIT_SUCCESS,
                payload
            }
        },
        setDeleteSuccess : (payload) => {
            return {
                type : actionNames.SET_DELETE_SUCCESS,
                payload
            }
        },
        setError : (payload) => {
            return {
                type : actionNames.SET_ERROR,
                payload
            }
        },
        setLoading : (payload) => {
            return {
                type : actionNames.SET_LOADING,
                payload
            }
        },
        resetStatus : () => {
            return {
                type : actionNames.RESET_STATUS
            }
        }
    }

    return [stateObjects, functions, actions];
}

export function boostrapReducer(type,payload, state, initialState, extraReducerFunctions = {}){
    const obj = {
        ...boostrapAxiosState(state, 'campaign')[1],
        ...extraReducerFunctions
    }

    if(Object.keys(obj).includes(type))
        return obj[type](payload);
    else return state;
}

export function getFormData(object){
    return Object.keys(object).reduce((formData, key) => {
        //if array then add it as an array
        if(Array.isArray(object[key])){
            object[key].map(element => formData.append(`${key}`, element.id));
        }
        else formData.append(key, object[key]);
        return formData;
    }, new FormData());
}

export function returnAxiosPromiseError(error){
    let errorMessage = error.toString();
    if(error.response?.data?.error){
        errorMessage += `: ${error.response.data.error}`;
    }
    return Promise.reject(errorMessage);
}