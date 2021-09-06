import {Container, Grid} from "@material-ui/core";

export default function CampaignContainerComponent(){
    return <Container>
        <Grid container>
            <Grid xs={3} item>Campaign #1</Grid>
            <Grid xs={3} item>Campaign #2</Grid>
            <Grid xs={3} item>Campaign #3</Grid>
            <Grid xs={3} item>Campaign #4</Grid>
            <Grid xs={3} item>Campaign #5</Grid>
        </Grid>
    </Container>
}