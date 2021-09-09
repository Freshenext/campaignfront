import {Button, CircularProgress, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import useStore from "./globalState/store";
import AlertComponent from "./shared/components/AlertComponent";
import CustomSnackbarComponent from "./CustomSnackbarComponent";
import {useForm} from 'react-hook-form';
import ImageInputComponent from "./shared/components/ImageInputComponent";
import useCheckbox from "./shared/components/useCheckbox";

export default function FormComponent(props){
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [isMobile, IsMobileCheckBoxComponent] = useCheckbox("Is Mobile", true);
    const [isDesktop, IsDesktopCheckBoxComponent] = useCheckbox("Is Desktop", true);
    const [image, setImage] = useState(undefined);
    const {editCampaign,
        createCampaign,
        isLoading,
        createSuccess,
        setCreateSuccess, deleteSuccess, setDeleteSuccess,
        setEditSuccess, editSuccess} = useStore(state => state);

    const submit = async formValues => {

        if(props.id){
            //Send edit
            await editCampaign({...formValues, image});
        } else {
            //Create
            await createCampaign({...formValues, image});
        }
    }


    return <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4} item>
            <TextField
                id="name"
                label="Name of Campaign"
                variant="outlined"
                name="name"
                fullWidth
                {...register('name', { required : true})}
                {...(errors.name ? { error : true, helperText : "Name is required"} : {})}
            />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
            <TextField
                id="category"
                label="Category"
                variant="outlined"
                name="category"
                fullWidth
                {...register('category', { required : true})}
                {...(errors.category ? { error : true, helperText : "Category is required"} : {})}
            />
        </Grid>
        <Grid xs={12} sm={12} md={8} item>
            <TextField
                id="url"
                label="URL"
                variant="outlined"
                name="url"
                helperText="i.e https://sofiapulse.com/"
                fullWidth
                {...register('url', { required : true})}
                {...(errors.url ? { error : true, helperText : "URL is required"} : {})}
            />
        </Grid>
        <Grid xs={12} item>
            <ImageInputComponent image={image} setImage={setImage} />
            {errors.image && <AlertComponent variant={"error"} message={"An image is required."} />}
        </Grid>
        <Grid xs={12} item>
            {IsMobileCheckBoxComponent}
            {IsDesktopCheckBoxComponent}
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained"
                    onClick={handleSubmit(submit)}
                    className="primaryBackgroundColor"
            >{props.editAble ? "Edit Campaign" : "Create new Campaign"}</Button>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center'}}>
            {isLoading && <CircularProgress />}
        </Grid>
        {createSuccess && <CustomSnackbarComponent message={"Campaigns saved successfully"} customFunctionOnHide={() => setCreateSuccess(false)} />}
        {deleteSuccess && <CustomSnackbarComponent message={"Campaign deleted successfully"} customFunctionOnHide={() => setDeleteSuccess(false)} />}
        {editSuccess && <CustomSnackbarComponent message={"Campaign edited successfully"} customFunctionOnHide={() => setEditSuccess(false)} />}
    </Grid>
}