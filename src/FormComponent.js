import {Button, CircularProgress, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import useStore from "./store";
import AlertComponent from "./AlertComponent";
import CustomSnackbarComponent from "./CustomSnackbarComponent";

const campaignObjInitState = {
    name : "",
    category : "",
    image : null,
    url : ""
}

export default function FormComponent(props){
    const [campaignObj, setCampaignObj] = useState(campaignObjInitState);
    const [campaignObjError, setCampaignObjError] = useState("");
    const {editCampaign,
        createCampaign,
        isLoading,
        createSuccess,
        setCreateSuccess, deleteSuccess, setDeleteSuccess,
        setEditSuccess, editSuccess} = useStore(state => state);

    const handleChange = (e) => {
        if(e.target.name === "image"){
            // validate images
            if(!['image/jpg','image/jpeg','image/png'].includes(e.target.value.type)){
                setCampaignObjError("Image must be PNG, JPG, or JPEG");
                return;
            }
        }
        setCampaignObj(state => ({
            ...state, [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
            if(props.editAble){
                setCampaignObj({ ...campaignObj, name : props.name, category : props.category, url  : props.url, id : props.id});
            }
    }, []);


    const submit = async () => {
        setCampaignObjError("");
        if(campaignObj.name === ""){
            setCampaignObjError("A name for the campaign is required.");
            return;
        }
        if(campaignObj.category === ""){
            setCampaignObjError("A category for the campaign is required.");
            return;
        }

        if(campaignObj.url === ""){
            setCampaignObjError("An URL is required.");
            return;
        }
        if(!props.editAble){
            if(campaignObj.image === null){
                setCampaignObjError("An image for the campaign is required.");
                return;
            }
            if(!['image/jpg','image/jpeg','image/png'].includes(campaignObj.image.type)){
                setCampaignObjError("Image must be PNG, JPG, or JPEG");
                return;
            }
        } else {
            if(campaignObj.image !== null && !['image/jpg','image/jpeg','image/png'].includes(campaignObj.image.type)){
                setCampaignObjError("Image must be PNG, JPG, or JPEG");
                return;
            }
        }

        if(props.editAble){
            //Send edit
            await editCampaign(campaignObj);
            props.closeDialog();

        } else {
            //Create
            await createCampaign(campaignObj);
        }

        setCampaignObj(campaignObjInitState);

    }


    return <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4} item>
            <TextField
                id="name"
                label="Name of Campaign"
                variant="outlined"
                value={campaignObj.name}
                onChange={handleChange}
                name="name"
                fullWidth
            />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
            <TextField
                id="category"
                label="Category"
                variant="outlined"
                value={campaignObj.category}
                onChange={handleChange}
                name="category"
                fullWidth
            />
        </Grid>
        <Grid xs={12} sm={12} md={8} item>
            <TextField
                id="url"
                label="URL"
                variant="outlined"
                value={campaignObj.url}
                onChange={handleChange}
                name="url"
                helperText="i.e https://sofiapulse.com/"
                fullWidth
            />
        </Grid>
        <Grid xs={12} item>
            <Button
                variant="contained"
                component="label"
                className="primaryBackgroundColor"
            >
                Upload image
                <input
                    type="file"
                    hidden
                    onChange={e => {
                        handleChange({ target : { name : "image", value : e.target.files[0]}})
                    }}
                />
            </Button>
            {campaignObj.image !== null && <div style={{ marginTop: '0.5em'}}><Typography variant="h6">Image name:</Typography> <Typography variant="subtitle1">{campaignObj.image.name}</Typography> </div>}
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained"
                    onClick={submit}
                    className="primaryBackgroundColor"
            >{props.editAble ? "Edit Campaign" : "Create new Campaign"}</Button>
        </Grid>
        <Grid item xs={12}>
            {campaignObjError && <AlertComponent variant={"error"} message={campaignObjError} />}
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center'}}>
            {isLoading && <CircularProgress />}
        </Grid>
        {createSuccess && <CustomSnackbarComponent message={"Campaigns saved successfully"} customFunctionOnHide={() => setCreateSuccess(false)} />}
        {deleteSuccess && <CustomSnackbarComponent message={"Campaign deleted successfully"} customFunctionOnHide={() => setDeleteSuccess(false)} />}
        {editSuccess && <CustomSnackbarComponent message={"Campaign edited successfully"} customFunctionOnHide={() => setEditSuccess(false)} />}
    </Grid>
}