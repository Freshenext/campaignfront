import {useState} from "react";
import {CircularProgress} from "@material-ui/core";

export default function useRequest(){
    const [request, setRequest] = useState({ status : 'idle', error: '', loading : undefined});
    const requestValues = { idle: 'idle', loading: 'loading', success: 'success', error: 'error'}

    const setRequestLoading = () => setRequest({ status: requestValues.loading, loading : <CircularProgress /> });
    const setRequestSuccess = () => {
        setRequest({ status: requestValues.success });
        setTimeout(() => {
            setRequest({ status: requestValues.idle});
        }, 5000);
    }
    const setRequestError = message => setRequest({ status: requestValues.error, error: message});

    return [request, { setRequestLoading, setRequestSuccess, setRequestError}];

}