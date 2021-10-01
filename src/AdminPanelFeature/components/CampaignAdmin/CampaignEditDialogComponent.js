import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import FormComponent from "./FormComponent";
import FormComponentEdit from "./FormComponentEdit";

export default function CampaignEditDialogComponent({closeDialog, name, isEdit, campaign = undefined}){
    return <Dialog open={"open"} onClose={closeDialog} fullWidth maxWidth='lg'>
        <DialogTitle>Edit campaign {campaign.name}</DialogTitle>
        <DialogContent dividers>
            <FormComponentEdit {...campaign} closeDialog={closeDialog} />
        </DialogContent>
    </Dialog>
}