import {Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import useLoading from "../../../shared/hooks/useLoading";
import {updateClient} from "../../../globalState/client/clientActions";
import useRequest from "../../../shared/hooks/useRequest";
import AlertComponent from "../../../shared/components/AlertComponent";
import {useEffect} from "react";

export default function ClientEditDialog({ id, name, url, open = true, toggle }){
    const { register, handleSubmit, formState : { errors }} = useForm({ defaultValues : { name, url }});
    const [request, requestObj] = useRequest();

    const onFormSubmit = (data) => {
        requestObj.setRequestLoading();
        updateClient({ ...data, id, url : data.url.toLowerCase()})
            .then(() => {
                requestObj.setRequestSuccess();
                toggle();
            })
            .catch((err) => {
                requestObj.setRequestError(err);
            })
    }
    return <Dialog open={open} onClose={toggle}>
        <DialogTitle>
            Edit client
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
                            {request.loading && request.loading}
                        </Box>
                        {request.error && request.error !== '' && (
                            <Box textAlign='center' marginTop={3}>
                                <AlertComponent variant='error' message={request.error} />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </form>
        </DialogContent>
    </Dialog>
}