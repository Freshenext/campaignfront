import CampaignCreateEditDialogComponent from "./CampaignCreateEditDialogComponent";
import {
    Button,
    CircularProgress, Container,
    Grid,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import CampaignTableRow from "../CampaignTableRow";
import CustomSnackbarComponent from "../../../CustomSnackbarComponent";
import CampaignActions from "../../../globalState/campaigns/campaignActions";
import useToggle from "../../../shared/hooks/useToggle";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Template from "../Template";
import campaignActions from "../../../globalState/campaigns/campaignActions";

export default function CampaignAdmin(props){
    const [create, toggleCreate] = useToggle();
    const {campaigns, createSuccess, editSuccess, deleteSuccess, isLoading, error} = useSelector(state => state.campaign);
    const [editCampaign, setEditCampaign] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        campaignActions.fetchCampaigns();
    }, []);

    return <Template>
        <Container style={{ marginTop: '2em'}}>
            {create && <CampaignCreateEditDialogComponent closeDialog={toggleCreate}  />}
            <Button className="primaryBackgroundColor" onClick={toggleCreate}>Create Campaign</Button>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {isLoading && <CircularProgress />}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>URL</TableCell>
                                    <TableCell>Is Desktop</TableCell>
                                    <TableCell>Is Mobile</TableCell>
                                    <TableCell>Image File</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {campaigns.map(campaign => {
                                    return <CampaignTableRow campaign={campaign} />
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {createSuccess && <CustomSnackbarComponent message={"Campaigns saved successfully"} customFunctionOnHide={() => dispatch(CampaignActions.setCreateSuccess(false))} />}
                    {/*{deleteSuccess && <CustomSnackbarComponent message={"Campaign deleted successfully"} customFunctionOnHide={() => setDeleteSuccess(false)} />}*/}
                    {/*{editSuccess && <CustomSnackbarComponent message={"Campaign edited successfully"} customFunctionOnHide={() => setEditSuccess(false)} />}*/}
                </Grid>
            </Grid>
            {editCampaign !== null &&
            <CampaignCreateEditDialogComponent {...editCampaign} closeDialog={() => setEditCampaign(null)} />
            }
        </Container>
    </Template>
}