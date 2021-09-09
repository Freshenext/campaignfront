
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

export default function AdminAreaContainer(){
    const {fetchCampaigns, campaigns, createCampaign, deleteCampaign, error, isLoading} = useStore(state => state);
    const [create, toggleCreate] = useToggle();
    //const [campaignObj, setCampaignObj] = useState(campaignObjInitState);
    const [campaignObjError, setCampaignObjError] = useState("");
    const [editCampaign, setEditCampaign] = useState(null);

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
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>URL</TableCell>
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
                </Grid>
            </Grid>
            {editCampaign !== null &&
                <CampaignCreateEditDialogComponent {...editCampaign} closeDialog={() => setEditCampaign(null)}

                />
            }
        </Container>
    </>
}