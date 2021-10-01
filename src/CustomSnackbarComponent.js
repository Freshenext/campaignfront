import {useState} from "react";
import {Snackbar} from "@material-ui/core";
import AlertComponent from "./shared/components/AlertComponent";

export default function CustomSnackbarComponent({message, customFunctionOnHide = () => {}, autoHideDuration = 5000}){
    const [isShown, setIsShown] = useState(true);
    return <Snackbar open={isShown} autoHideDuration={autoHideDuration} onClose={_ => {
        customFunctionOnHide();
    }}>
        <AlertComponent message={message} variant="success" />
    </Snackbar>
}