import {Button, CircularProgress, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import AlertComponent from "../../../shared/components/AlertComponent";
import {useForm} from 'react-hook-form';
import ImageInputComponent from "../../../shared/components/ImageInputComponent";
import useCheckbox from "../../../shared/components/useCheckbox";
import {useDispatch, useSelector} from "react-redux";
import CampaignActions from '../../../globalState/campaigns/campaignActions';
import categoriesActions from "../../../globalState/categories/categoriesActions";
import MultiSelectEditComponent from "../MultiSelectEditComponent";
import {fetchCategories} from "../../../globalState/categories/categoriesParametersActions";
import {Autocomplete} from "@material-ui/lab";

export default function FormComponentEdit({ name, url, isMobile, isDesktop, category, urlFull, closeDialog, id, CampaignCategories}){
    const [isMobileCheck, IsMobileCheckBoxComponent] = useCheckbox("Is Mobile", isMobile);
    const [checkboxError, setCheckboxError] = useState("");
    const [isDesktopCheck, IsDesktopCheckBoxComponent] = useCheckbox("Is Desktop", isDesktop);
    const dispatch = useDispatch();
    const [selectedCategories, setSelectedCategories] = useState(CampaignCategories.map(Category => Category.categoryName));
    const [imageError, setImageError] = useState("");
    const { categories } = useSelector(state => state.category);
    const [selectCategoryError, setSelectCategoryError] = useState("");
    const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues :{
            isMobile,
            isDesktop,
            name,
            category,
            url
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
            closeDialog();
    }, [createSuccess]);

    const handleCategoryChange = (event, value) => {
        setSelectCategoryError('');
        setSelectedCategories(value);
    }


    const submit = async formValues => {
        setImageError("");
        setCheckboxError("");
        setSelectCategoryError("");
        if(selectedCategories.length <= 0){
            setSelectCategoryError("A category must be selected.");
            return;
        }
        if(isMobileCheck === false && isDesktopCheck === false){
            setCheckboxError("One checkbox must be selected.");
            return;
        }
        await CampaignActions.editCampaign({...formValues, id,image, isDesktop : isDesktopCheck, isMobile : isMobileCheck, category : selectedCategories.join(',')});
        closeDialog();
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
                defaultValue={selectedCategories}
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
            <ImageInputComponent image={image} setImage={setImage} hasImage={urlFull} />
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
            >{id ? "Edit Campaign" : "Create new Campaign"}</Button>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center'}}>
            {isLoading && <CircularProgress />}
        </Grid>
    </Grid>
}