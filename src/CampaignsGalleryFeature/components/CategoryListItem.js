import {ListItem, ListItemText} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import categoriesActions from "../../globalState/categories/categoriesActions";
import {useEffect} from "react";

export default function CategoryListItem({name, selected = false, index = -1, id}){
    const dispatch = useDispatch();
    const {selectedCategory} = useSelector(state => state.category);
    const isSelected = selectedCategory.id === id;

    return <ListItem
        className="listItem"
        onClick={_ => dispatch(categoriesActions.setSelectedCategory({name, id}))}
        selected={isSelected}
    >
        <ListItemText primary={name} />
    </ListItem>
}