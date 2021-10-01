import {Button, CircularProgress, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import useStore from "../../../globalState/store";
import AlertComponent from "../../../shared/components/AlertComponent";
import CustomSnackbarComponent from "../../../CustomSnackbarComponent";
import {useForm} from 'react-hook-form';
import ImageInputComponent from "../../../shared/components/ImageInputComponent";
import useCheckbox from "../../../shared/components/useCheckbox";
import {useDispatch, useSelector} from "react-redux";
import CampaignActions from '../../../globalState/campaigns/campaignActions';
import MultiSelectCustom from "../../../MultiSelectCustom";
import {isIS} from "@material-ui/core/locale";
import {fetchCategories} from "../../../globalState/categories/categoriesParametersActions";
import {Autocomplete} from "@material-ui/lab";

export default function FormComponent({...props}){
    const [isMobile, IsMobileCheckBoxComponent] = useCheckbox("Is Mobile", props.isMobile);
    const [checkboxError, setCheckboxError] = useState("");
    const [isDesktop, IsDesktopCheckBoxComponent] = useCheckbox("Is Desktop", props.isDesktop);
    const dispatch = useDispatch();
    const [imageError, setImageError] = useState("");
    const {categories} = useSelector(state => state.category);
    const [selectCategoryError, setSelectCategoryError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleCategoryChange = (event, value) => {
        setSelectCategoryError('');
        setSelectedCategory(value);
    }
    const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues :{
            isMobile,
            isDesktop,
            name : props.name,
            category : props.category,
            url : props.url
        }});
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        fetchCategories();
    }, []);

    const {
        isLoading, createSuccess
        } = useSelector(state => state.campaign);

    useEffect(() => {
        console.log(createSuccess);
        if(createSuccess)
            props.closeDialog();
    }, [createSuccess]);

    const submit = async formValues => {
        setImageError("");
        setCheckboxError("");
        setSelectCategoryError("");
        if(selectedCategory.length <= 0){
            setSelectCategoryError("A category must be selected.");
            return;
        }
        if(isDesktop === false && isMobile === false){
            setCheckboxError("One checkbox must be selected.");
            return;
        }
        if(props.id){
            //Send edit
            await dispatch(CampaignActions.editCampaign({...formValues, id : props.id,image, isDesktop, isMobile, category : selectedCategory}));
            props.closeDialog();
        } else {
            //Create
            if(!image){
                setImageError("An image is required.");
                return;
            }
            CampaignActions.createCampaign({...formValues, image, isDesktop, isMobile, category : selectedCategory.join(',')})
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
        <Grid xs={12} sm={12} md={12} item>
            <Autocomplete
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label='Type category to search...'
                        variant='outlined'
                        {...(selectCategoryError !== '' ? { error : true, helperText : selectCategoryError } : {})}
                    />}
                id='categories-select'
                options={categories}
                getOptionLabel={option => option}
                onChange={handleCategoryChange}
                multiple
                disableCloseOnSelect

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
            <ImageInputComponent image={image} setImage={setImage} hasImage={props.urlFull} />
            {imageError && <AlertComponent variant={"error"} message={"An image is required."} />}
        </Grid>
        <Grid xs={12} item>
            {IsDesktopCheckBoxComponent}
            {IsMobileCheckBoxComponent}
            {checkboxError !== "" && <AlertComponent variant="error" message={checkboxError} /> }
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