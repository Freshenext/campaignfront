import {List, ListItem, ListItemText, TextField, Typography} from "@material-ui/core";

export default function DrawerCampaignListComponent(){
    return <>
        <Typography variant="h3" style={{ textAlign : 'center'}}>Sofia Pulse</Typography>
        <TextField
            id="standard-basic"
            label="Search for Campaigns"
            variant="outlined"
            style={{ margin: '1em'}}
            onChange={(e) => {
                console.log("changed to: ", e.target.value);
            }}
        />
        <List>
            <ListItem>
                <ListItemText primary="Campaign Name" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Campaign Name" />
            </ListItem>
            <ListItem onClick={(e) => {
                console.log("Clicked campaign")
            }}>
                <ListItemText primary="Campaign Name" />
            </ListItem>
        </List>
    </>
}