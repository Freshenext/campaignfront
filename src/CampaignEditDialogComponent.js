import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import FormComponent from "./FormComponent";

export default function CampaignEditDialogComponent(props){

    return <Dialog open={"open"} onClose={props.closeDialog}>
        <DialogTitle>Edit campaign ${props.name}</DialogTitle>
        <DialogContent>
            <FormComponent editAble={true} {...props} closeDialog={props.closeDialog} />
        </DialogContent>
    </Dialog>
}