import {Box, Button, CircularProgress, Container, Grid, Paper, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import AlertComponent from "../shared/components/AlertComponent";
import {useForm} from "react-hook-form";
import {loginUser} from "../globalState/auth/authActions";
import {Redirect} from "react-router-dom";

const styles = {
    container : {
        marginTop: '2em',
    },
    paper : {
        padding: '1em'
    },
    items : {
        marginTop: '1em',
        marginBottom: '1em',
    }
}
export default function LoginContainer(){
    const auth = useSelector(state => state.auth);
    const {register, handleSubmit, formState : {errors}} = useForm();

    const onFormSubmit = (data) => {
        loginUser(data);
    }

    if(auth.username){
        return <Redirect to='/admin' />
    }

    return <Container maxWidth='sm' style={styles.container}>
        <Paper elevation={3} style={styles.paper}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container direction="column">
                    <Box textAlign='center'>
                        <Grid item xs={12} style={styles.items}>
                            <img src='/logo.png' alt='SofiaPulse logo'/>
                        </Grid>
                        <Grid item xs={12} style={styles.items}>
                            <TextField
                                label='Username'
                                variant="outlined"
                                fullWidth
                                {...register('username', {required: true})}
                                {...(errors.username ? { error : true, helperText : 'Username is required.' } : {})}
                            />
                        </Grid>
                        <Grid item xs={12} style={styles.items}>
                            <TextField
                                label='Password'
                                variant="outlined"
                                type="password"
                                fullWidth
                                {...register('password', {required: true})}
                                {...(errors.password ? { error : true, helperText : 'Password is required.' } : {})}
                            />
                        </Grid>
                        <Grid item xs={12} style={styles.items}>
                            <Button type='submit' variant="contained">Login</Button>
                        </Grid>
                        {auth.requestStatus === 'loading' && <CircularProgress/>}
                        {auth.error !== '' && <AlertComponent variant='error' message={auth.error}/>}
                    </Box>
                </Grid>
            </form>
        </Paper>
    </Container>
}