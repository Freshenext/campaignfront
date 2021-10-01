import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import FormComponent from "./FormComponent";

export default function CampaignCreateEditDialogComponent({closeDialog, name, isEdit, campaign = undefined}){
    return <Dialog open={"open"} onClose={closeDialog} fullWidth maxWidth='lg'>
        {!campaign && <DialogTitle>Create Campaign</DialogTitle>}
        {campaign && <DialogTitle>Edit campaign {campaign.name}</DialogTitle>}
        <DialogContent dividers>
            <FormComponent {...campaign} closeDialog={closeDialog} />
        </DialogContent>
    </Dialog>
}