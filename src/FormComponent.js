import {Button, CircularProgress, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import useStore from "./globalState/store";
import AlertComponent from "./shared/components/AlertComponent";
import CustomSnackbarComponent from "./CustomSnackbarComponent";
import {useForm} from 'react-hook-form';
import ImageInputComponent from "./shared/components/ImageInputComponent";
import useCheckbox from "./shared/components/useCheckbox";

export default function FormComponent(props){
    const [isMobile, IsMobileCheckBoxComponent] = useCheckbox("Is Mobile", props.isMobile || true);
    const [isDesktop, IsDesktopCheckBoxComponent] = useCheckbox("Is Desktop", props.isDesktop || true);
    const [imageError, setImageError] = useState("");
    const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues :{
            isMobile,
            isDesktop,
            name : props.name,
            category : props.category,
            url : props.url
        }});

    const [image, setImage] = useState(undefined);
    const {editCampaign,
        createCampaign,
        isLoading,
        createSuccess,
        setCreateSuccess, deleteSuccess, setDeleteSuccess,
        setEditSuccess, editSuccess} = useStore(state => state);

    const submit = async formValues => {
        setImageError("");
        if(props.id){
            //Send edit
            await editCampaign({...formValues, id : props.id,image, isDesktop, isMobile});
            props.closeDialog();
        } else {
            //Create
            if(!image){
                setImageError("An image is required.");
                return;
            }

            createCampaign({...formValues, image, isDesktop, isMobile})
                .then(_ => {
                    props.closeDialog();
                })
                .catch(err => {
                    if(err.response){
                        setImageError(err.response.data)
                    }
                });

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
            {imageError && <AlertComponent variant={"error"} message={"An image is required."} />}
        </Grid>
        <Grid xs={12} item>
            {IsMobileCheckBoxComponent}
            {IsDesktopCheckBoxComponent}
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained"
                    onClick={handleSubmit(submit)}
                    className="primaryBackgroundColor"
            >{props.id ? "Edit Campaign" : "Create new Campaign"}</Button>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center'}}>
            {isLoading && <CircularProgress />}
        </Grid>
    </Grid>
}