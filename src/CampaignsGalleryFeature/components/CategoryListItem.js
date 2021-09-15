import {ListItem, ListItemText} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import categoriesActions from "../../globalState/categories/categoriesActions";
import {useEffect} from "react";

/*
* menu item background 644798 and color white
* on menu item selected background color: A791CF and color: white
* padding to the menu item
* */
export default function CategoryListItem({name, selected = false, index = -1, id}){
    const dispatch = useDispatch();
    const {selectedCategory} = useSelector(state => state.category);
    const isSelected = selectedCategory.id === id;
    const style = isSelected ? { backgroundColor : "#A791CF !important"} : {};

    return <div className="listItemDiv">
        <ListItem
            className={"listItem " + (isSelected === true ? " selectedListItem" : "")}
            onClick={_ => dispatch(categoriesActions.setSelectedCategory({name, id}))}
            selected={isSelected}
        >
            <ListItemText primary={name} />
        </ListItem>
    </div>
}