import {CheckCircleOutline, ErrorOutline} from "@material-ui/icons";


export default function AlertComponent({variant = '', message}){
    console.log(variant);

    switch(variant){
        case 'success':
            return <div className="alertDiv alertSuccess"><CheckCircleOutline className={"iconMargin"} /> {message}</div>
        case 'error':
            return <div className="alertDiv alertError"><ErrorOutline className={"iconMargin"} /> {message}</div>
        default:
            return <div className="alertDiv"> {message}</div>
    }

}