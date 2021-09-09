import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import FormComponent from "./FormComponent";

export default function CampaignCreateEditDialogComponent({closeDialog, name, isEdit, campaign = undefined}){
    console.log(campaign);
    return <Dialog open={"open"} onClose={closeDialog}>
        {!campaign && <DialogTitle>Create Campaign</DialogTitle>}
        {campaign && <DialogTitle>Edit campaign ${name}</DialogTitle>}
        <DialogContent dividers>
            <FormComponent {...campaign} closeDialog={closeDialog} />
        </DialogContent>
    </Dialog>
}