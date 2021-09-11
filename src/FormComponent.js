import {Button, CircularProgress, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import useStore from "./globalState/store";
import AlertComponent from "./shared/components/AlertComponent";
import CustomSnackbarComponent from "./CustomSnackbarComponent";
import {useForm} from 'react-hook-form';
import ImageInputComponent from "./shared/components/ImageInputComponent";
import useCheckbox from "./shared/components/useCheckbox";
import {useDispatch, useSelector} from "react-redux";
import CampaignActions from './globalState/campaigns/campaignActions';
import categoriesActions from "./globalState/categories/categoriesActions";
import MultiSelectCustom from "./MultiSelectCustom";

export default function FormComponent(props){

    const [isMobile, IsMobileCheckBoxComponent] = useCheckbox("Is Mobile", props.isMobile);
    const [isDesktop, IsDesktopCheckBoxComponent] = useCheckbox("Is Desktop", props.isDesktop);
    const dispatch = useDispatch();

    const [selectedCategories, setSelectedCategories] = useState(props ? (props.Categories ? props.Categories : []) : []);
    const [imageError, setImageError] = useState("");
    const { categories} = useSelector(state => state.category);
    const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues :{
            isMobile,
            isDesktop,
            name : props.name,
            category : props.category,
            url : props.url
        }});
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        dispatch(categoriesActions.fetchCategories());
    }, []);

    const {
        isLoading,
        } = useSelector(state => state.campaign);

    const submit = async formValues => {
        setImageError("");
        if(props.id){
            //Send edit
            //await editCampaign({...formValues, id : props.id,image, isDesktop, isMobile});
            props.closeDialog();
        } else {
            //Create
            if(!image){
                setImageError("An image is required.");
                return;
            }

            dispatch(CampaignActions.createCampaign({...formValues, image, isDesktop, isMobile, category : selectedCategories.map(cat => cat.id).join(',')}));
        }
    }


    return <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={6} item>
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
        <Grid xs={12} sm={6} md={6} item>
            <MultiSelectCustom
                elements={categories}
                setSelectedValues={setSelectedCategories}
                onAddNew={(data) => dispatch(categoriesActions.createCategory(data))}
                onDelete={(id) => dispatch(categoriesActions.deleteCategory(id))}
            />
        </Grid>
        <Grid xs={12} sm={12} md={12} item>
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