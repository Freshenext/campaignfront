import {Button, TableCell, TableRow} from "@material-ui/core";
import useToggle from "../../shared/hooks/useToggle";
import {Cancel, Check} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import campaignActions from "../../globalState/campaigns/campaignActions";
import CampaignEditDialogComponent from "./CampaignAdmin/CampaignEditDialogComponent";
import CustomSnackbarComponent from "../../CustomSnackbarComponent";

export default function CampaignTableRow({campaign}){
    const dispatch = useDispatch();
    const [editToggle, setEditToggle] = useToggle();
    const { editSuccess} = useSelector(state => state.campaign);
    return <TableRow key={campaign.id}>
        <TableCell>{campaign.id}</TableCell>
        <TableCell>{campaign.name}</TableCell>
        <TableCell style={{ lineBreak: 'anywhere' }}>{campaign.CampaignCategories && campaign.CampaignCategories.map(Category => Category.categoryName).join(',')}</TableCell>
        <TableCell>{campaign.url}</TableCell>
        <TableCell>{campaign.isDesktop ? <Check /> : <Cancel />}</TableCell>
        <TableCell>{campaign.isMobile ? <Check /> : <Cancel />}</TableCell>
        <TableCell>
            <img src={"https://campaignapi.francis.center/images/" + campaign.imagePath} className="imageRes" />
            {/*<img src={"http://localhost:5000/images/" + campaign.imagePath} className="imageRes" />*/}
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
        {editToggle && <CampaignEditDialogComponent closeDialog={setEditToggle} campaign={campaign}/>}
        {editSuccess && <CustomSnackbarComponent message={"Edit successfully."} autoHideDuration={4000} customFunctionOnHide={() => {
            dispatch(campaignActions.setEditSuccess(false));
        }}  />}
    </TableRow>
}