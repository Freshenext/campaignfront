import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CategoryListItem from "./components/CategoryListItem";
import {Box, TextField} from "@material-ui/core";
import CampaignContainerComponent from "../CampaignContainerComponent";
import {useDispatch, useSelector} from "react-redux";
import campaignActions from "../globalState/campaigns/campaignActions";
import categoriesActions from "../globalState/categories/categoriesActions";
import BookDemoFormComponent from "./components/BookDemoFormComponent";

const drawerWidth = 253;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#644798'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function DrawerComponent(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { category : { categories } } = useSelector(state => state);
    const [categorySearch, setCategorySearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(campaignActions.fetchCampaigns());
        dispatch(categoriesActions.fetchCategories());
    }, []);

    useEffect(() => {
        categoriesActions.setCategorySearch(categorySearch);
    }, [categorySearch])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div >
            <div className={classes.toolbar}>
                <img src="SofiaPulseLogo.png" className="logo" />
            </div>
            <Box width="100%" paddingLeft="1em" paddingRight="1em" marginBottom="30px">
                <TextField
                    id="searchCategoryInput"
                    label="Search"
                    InputLabelProps={{ style : { color: '#8667BD'}}}
                    InputProps={{ style : { borderRadius: '10px', color : 'white'}}}
                    variant="outlined"
                    style={{ color: "white !important"}}
                    onChange={(e) => {
                        setCategorySearch(e.target.value);
                    }}
                    value={categorySearch}
                    fullWidth
                />
            </Box>
            <CategoryListItem name="All campaigns" />
            {categories.filter(category => {
                if(categorySearch !== ""){
                    return category.name.toUpperCase().includes(categorySearch.toUpperCase());
                } else return true;
            })
                .map((category, index) => {
                return <CategoryListItem {...category} index={index}/>
            })}
            <BookDemoFormComponent />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: '#644798'}}>
                        <Toolbar>
                            <Box display="flex" flexGrow="1" justifyContent="center">
                                <img src="SofiaPulseLogo.png" style={{ height: '32px', width: '215px'}} />
                            </Box>
                            <Box position="absolute" right={12} onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <CampaignContainerComponent />
            </main>
        </div>
    );
}



export default DrawerComponent;