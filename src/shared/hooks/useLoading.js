import {useState, useMemo} from "react";
import {CircularProgress} from "@material-ui/core";

export default function useLoading(initState = false){
    const [loading, setLoading] = useState(initState);
    const toggleLoading = (loadingVar = loading) => {
        setLoading(loadingVar);
    };

    const loadingBar = useMemo(() => {
        return loading ? <CircularProgress /> : undefined;
    }, [loading]);


    return [loadingBar, toggleLoading];
}