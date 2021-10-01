import {Box, Button, Dialog, DialogContent, DialogTitle, Grid, Paper, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {insertClient} from "../../../globalState/client/clientActions";
import useLoading from "../../../shared/hooks/useLoading";
import useRequest from "../../../shared/hooks/useRequest";
import AlertComponent from "../../../shared/components/AlertComponent";

export default function ClientCreateDialog({ open = true, toggle }){
    const { register, handleSubmit, formState : { errors }} = useForm();
    const [loadingBar, toggleLoading] = useLoading();
    const [request, requestObj] = useRequest();

    const onFormSubmit = async (data) => {
        toggleLoading();
        insertClient({ ...data, url : data.url.toLowerCase()})
            .then(() => {
                toggle();
            })
            .catch((err) => {
                requestObj.setRequestError(err);
            })
            .finally(() => toggleLoading());

    }
    return <Dialog open={open} onClose={toggle}>
        <DialogTitle>
            Create client
        </DialogTitle>
        <DialogContent dividers>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box marginBottom={3}>
                            <TextField
                                label="Name of the client"
                                variant="outlined"
                                fullWidth
                                {...register('name', { required : true})}
                                {...(errors.name ? { error : true, helperText : "Name is required"} : {})}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box marginBottom={3}>
                            <TextField
                                label="URL"
                                variant="outlined"
                                fullWidth
                                {...register('url', { required : true})}
                                {...(errors.url ? { error : true, helperText : "URL is required"} : {})}
                                className='textTransformLowerCase'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Button type='submit' className='primaryBackgroundColor' variant="contained">Save new client </Button>
                        </Box>
                        <Box textAlign='center'>
                            {loadingBar && loadingBar}
                        </Box>
                        {request.error !== '' && (<Box textAlign='center' marginTop={3}>
                            <AlertComponent variant='error' message={request.error} />
                        </Box>)}
                    </Grid>
                </Grid>
            </form>
        </DialogContent>
    </Dialog>
}