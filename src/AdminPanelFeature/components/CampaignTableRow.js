import {Button, TableCell, TableRow} from "@material-ui/core";
import useToggle from "../../shared/hooks/useToggle";
import CampaignCreateEditDialogComponent from "../../CampaignCreateEditDialogComponent";

import {Cancel, Check} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import campaignActions from "../../globalState/campaigns/campaignActions";

export default function CampaignTableRow({campaign}){
    const dispatch = useDispatch();
    const [editToggle, setEditToggle] = useToggle();
    return <TableRow key={campaign.id}>
        <TableCell>{campaign.id}</TableCell>
        <TableCell>{campaign.name}</TableCell>
        <TableCell>{campaign.Categories && campaign.Categories.map(Category => Category.name).join(',')}</TableCell>
        <TableCell>{campaign.url}</TableCell>
        <TableCell>{campaign.isDesktop ? <Check /> : <Cancel />}</TableCell>
        <TableCell>{campaign.isMobile ? <Check /> : <Cancel />}</TableCell>
        <TableCell>
            <img src={"https://campaignapi.francis.center/images/" + campaign.imagePath} className="imageRes" />
        </TableCell>
        <TableCell>
            <Button variant='contained'
                    color="primary"
                    onClick={() => {
                        setEditToggle();
                    }}
                    style={{ marginRight: '1em'}}>
                Edit
            </Button>
            <Button
                variant='contained'
                color="primary"
                onClick={() => {
                    dispatch(campaignActions.deleteCampaign(campaign.id));
                }}
            >Delete</Button>
        </TableCell>
        {editToggle && <CampaignCreateEditDialogComponent closeDialog={setEditToggle} campaign={campaign}/>}
    </TableRow>
}