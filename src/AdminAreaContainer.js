
/*
* una campaign tiene nombre, categoria, imagen
* */
import {
    AppBar,
    Button, CircularProgress,
    Container, Dialog, DialogContent, DialogTitle,
    Grid, Paper, Snackbar,
    Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {useEffect, useState} from "react";
import useStore from "./../src/globalState/store";
import CampaignCreateEditDialogComponent from "./CampaignCreateEditDialogComponent";
import FormComponent from "./FormComponent";
import useToggle from "./shared/hooks/useToggle";
import CampaignTableRow from "./AdminPanelFeature/components/CampaignTableRow";
import CustomSnackbarComponent from "./CustomSnackbarComponent";
import MultipleSelect from "./shared/MultipleSelect";
import MultiSelectCustom from "./MultiSelectCustom";

export default function AdminAreaContainer(){
    const {fetchCampaigns, campaigns, createSuccess, setCreateSuccess
        ,editSuccess, setEditSuccess
    ,deleteSuccess, setDeleteSuccess} = useStore(state => state);
    const [create, toggleCreate] = useToggle();
    //const [campaignObj, setCampaignObj] = useState(campaignObjInitState);
    const [campaignObjError, setCampaignObjError] = useState("");
    const [editCampaign, setEditCampaign] = useState(null);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        fetchCampaigns();
    }, []);



    return <>
        <AppBar >
            <Toolbar>
                <Typography>Campaign Admin Area</Typography>
            </Toolbar>
        </AppBar>
        <Toolbar style={{ marginBottom: '1em'}} />
        <Container style={{ marginTop: '2em'}}>
            {create && <CampaignCreateEditDialogComponent closeDialog={toggleCreate}  />}
            <Button className="primaryBackgroundColor" onClick={toggleCreate}>Create Campaign</Button>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MultiSelectCustom setSelectedValues={setSelectedValues}  />
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table >
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
                    {createSuccess && <CustomSnackbarComponent message={"Campaigns saved successfully"} customFunctionOnHide={() => setCreateSuccess(false)} />}
                    {deleteSuccess && <CustomSnackbarComponent message={"Campaign deleted successfully"} customFunctionOnHide={() => setDeleteSuccess(false)} />}
                    {editSuccess && <CustomSnackbarComponent message={"Campaign edited successfully"} customFunctionOnHide={() => setEditSuccess(false)} />}
                </Grid>
            </Grid>
            {editCampaign !== null &&
                <CampaignCreateEditDialogComponent {...editCampaign} closeDialog={() => setEditCampaign(null)}

                />
            }
        </Container>
    </>
}