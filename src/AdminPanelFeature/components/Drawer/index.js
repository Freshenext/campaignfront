import {Drawer, Link, List, ListItem, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import useToggle from "../../../shared/hooks/useToggle";
import {Face, Home, Web} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    drawer : {
        width: 250
    }
});

export default function CustomDrawer({ open, toggle }){
    const classes = useStyles();

    return <Drawer anchor='left' open={open} classes={classes.drawer} onClose={toggle}>
        <List>
            <Link href='/admin'>
                <ListItem >
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
            </Link>
            <Link href='/admin/campaign'>
                <ListItem >
                    <ListItemIcon><Web /></ListItemIcon>
                    <ListItemText primary='Campaigns' />
                </ListItem>
            </Link>
            <Link href='/admin/client'>
                <ListItem >
                    <ListItemIcon><Face /></ListItemIcon>
                    <ListItemText primary='Clients' />
                </ListItem>
            </Link>

        </List>
    </Drawer>
}