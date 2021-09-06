
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
import useStore from "./store";
import CampaignEditDialogComponent from "./CampaignEditDialogComponent";
import FormComponent from "./FormComponent";

export default function DemosCrudComponent(){
    const {fetchCampaigns, campaigns, createCampaign, deleteCampaign, error, isLoading} = useStore(state => state);
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
            <FormComponent />
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
                                    return <TableRow key={campaign.id}>
                                        <TableCell>{campaign.id}</TableCell>
                                        <TableCell>{campaign.name}</TableCell>
                                        <TableCell>{campaign.category}</TableCell>
                                        <TableCell>{campaign.url}</TableCell>
                                        <TableCell>
                                            <img src={"http://localhost:5000/images/" + campaign.imagePath} className="imageRes" />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant='contained'
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditCampaign(campaign);
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
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {editCampaign !== null &&
                <CampaignEditDialogComponent {...editCampaign} closeDialog={() => setEditCampaign(null)}

                />
            }
        </Container>
    </>
}