import {ListItem, ListItemText} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import categoriesActions from "../../globalState/categories/categoriesActions";
import {useEffect} from "react";

/*
* menu item background 644798 and color white
* on menu item selected background color: A791CF and color: white
* padding to the menu item
* */
export default function CategoryListItem({categoryName, selected = false, index = -1, id, isException = 0}){
    const {selectedCategory} = useSelector(state => state.category);
    const isSelected = selectedCategory.categoryName === categoryName;
    const style = isSelected ? { backgroundColor : "#A791CF !important"} : {};

    return <div className="listItemDiv">
        <ListItem
            className={"listItem " + (isSelected === true ? " selectedListItem" : "")}
            onClick={_ => categoriesActions.setSelectedCategory({categoryName, id, isException})}
            selected={isSelected}
        >
            <ListItemText primary={categoryName} />
        </ListItem>
    </div>
}