import {Button, TableCell, TableRow} from "@material-ui/core";
import useToggle from "../../shared/hooks/useToggle";
import CampaignCreateEditDialogComponent from "../../CampaignCreateEditDialogComponent";
import useStore from "../../globalState/store";
import {Cancel, Check} from "@material-ui/icons";

export default function CampaignTableRow({campaign}){
    const { deleteCampaign } = useStore(state => state);
    const [editToggle, setEditToggle] = useToggle();
    return <TableRow key={campaign.id}>
        <TableCell>{campaign.id}</TableCell>
        <TableCell>{campaign.name}</TableCell>
        <TableCell>{campaign.category}</TableCell>
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
                    deleteCampaign(campaign.id);
                }}
            >Delete</Button>
        </TableCell>
        {editToggle && <CampaignCreateEditDialogComponent closeDialog={setEditToggle} campaign={campaign}/>}
    </TableRow>
}