import {Drawer, List, ListItem, ListItemText, TextField, Typography} from "@material-ui/core";
import useStore from "../../store";
import {useEffect} from "react";
import CategoryListItem from "./CategoryListItem";

export default function DrawerCampaignListComponent(){
    const { categories, fetchCategories} = useStore(state => state);

    useEffect(() => {
        fetchCategories();

    }, []);

    useEffect(() => {console.log(categories);}, [categories])

    return <Drawer anchor={"left"} open={true} variant="permanent">
        <img src="logo.png" className="logo" />
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
            <CategoryListItem name="All campaigns" />
            {categories.map((category, index) => {
                return <CategoryListItem {...category} index={index}/>
            })}
        </List>
    </Drawer>
}