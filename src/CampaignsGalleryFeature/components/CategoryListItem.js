import {ListItem, ListItemText} from "@material-ui/core";
import useStore from "../../globalState/store";

export default function CategoryListItem({name, selected = false, index = -1}){
    const {setSelectedCategory, selectedCategory} = useStore(state => state);
    const classes = [];
    classes.push('listItem');
    if(selected)
        classes.push('selected');

    if(index === -1 && Object.keys(selectedCategory).length === 0)
        classes.push('selected');

    return <ListItem
        className={classes.join(' ')}
        onClick={_ => setSelectedCategory(index)}
    >
        <ListItemText primary={name} />
    </ListItem>
}