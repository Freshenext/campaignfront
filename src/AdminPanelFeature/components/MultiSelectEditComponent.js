import {Chip, InputAdornment, MenuItem, Paper, TextField} from "@material-ui/core";
import {AddCircle, ArrowDownwardOutlined, Delete, DeleteOutline, RemoveCircle} from "@material-ui/icons";
import {useEffect, useState} from "react";
import categoriesActions from "../../globalState/categories/categoriesActions";
import {useSelector} from "react-redux";

const classes = {
    selectedItemsContainer : {
        display : 'flex',
        flexDirection : 'row',
    },
    selectedItemsFirst : {
        flex : '90 1 0',
    },
    selectedItemsSecond : {
        flex : '10 1 0',
        alignSelf: 'center'
    },
    paperHide : {
        display: 'none'
    },
    selectContainerMultiSelect : {
        position: 'absolute',
        top: '120%',
        backgroundColor: 'white',
        width: '100%',
        zIndex : 999
    },
    selectContainerPadding : {
        padding: '1em'
    },
    menuItemContainer : {
        display: 'flex',
        marginBottom: '1em'
    },
    menuItemItems : {
        flex: '1'
    }
}

export default function MultiSelectEditComponent({setSelectedValues, onAddNew = undefined, onDelete = undefined, currentCategories}){
    const { categories } = useSelector(state => state.category);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [insertCategory, setInsertCategory] = useState({ name : ""});

    const [hideSelect, setHideSelect] = useState(true);
    const handleInsertCategory = (e) => {
        //dataForSelect.push(insertCategory);
        setInsertCategory({ name : e.target.value});
    }

    useEffect(() => {
        /* Set categories that are selected */
        setCategoriesSelected();
    }, []);

    useEffect(()=> {
        setCategoriesSelected();
    }, [categories]);

    const setCategoriesSelected = () => {
        currentCategories.map(currentCategory => {
            const categoryFound = [...categories].find(categoryFinder => categoryFinder.id === currentCategory.id);
            if(categoryFound)
                categoryFound.isSelected = true;
        });
        setCategoriesArr(categories);
    }

    const handleInsertCategoryEnter = (e) => {
        if(e.key === "Enter"){
            // Add category if not empty
            if(insertCategory.name !== ""){
                if(onAddNew)
                    onAddNew(insertCategory);
                setInsertCategory({ name : ""});
            }
        }
    }


    useEffect(() => {
        setSelectedValues(categoriesArr.filter(element => element.isSelected === true));
    }, [categoriesArr]);

    const handleElementAdded = index => {
        categoriesArr[index].isSelected = categoriesArr[index].isSelected ? !categoriesArr[index].isSelected : true;
        setCategoriesArr([...categoriesArr]);
    }

    const handleElementRemoved = selectedValue => {
        selectedValue.isSelected = false;
        setCategoriesArr([...categoriesArr]);
    }

    const handleDelete = id => {
        if(onDelete){
            onDelete(id);
        }
    }


    return <div className="containerMultiSelect">
        <div style={classes.selectedItemsContainer} onClick={() => setHideSelect(!hideSelect)}>
            <div style={classes.selectedItemsFirst}>
                {categoriesArr.filter(element => element.isSelected).map(selectedValue => {
                    return <Chip
                        className="chipSelected"
                        label={selectedValue.name}
                        value={selectedValue.id || 0}
                        onDelete={_ => handleElementRemoved(selectedValue)}
                    />
                })}
            </div>
            <div  style={classes.selectedItemsSecond} ><ArrowDownwardOutlined /></div>
        </div>
        {!hideSelect &&
        <Paper elevation={3} style={classes.selectContainerMultiSelect}>
            <div className="addMultiSelect" style={classes.selectContainerPadding}>
                <TextField
                    label="Insert category"
                    variant="outlined"
                    helperText="i.e 600x800, robots"
                    fullWidth
                    InputProps={{
                        endAdornment : <InputAdornment position={"end"} ><AddCircle /></InputAdornment>
                    }}
                    value={insertCategory.name}
                    onChange={handleInsertCategory}
                    onKeyPress={handleInsertCategoryEnter}
                />
            </div>
            <div className="optionsMultiSelect" style={classes.selectContainerPadding}>
                {categoriesArr.map((element, index) => (
                    <MenuItem
                        selected={element.isSelected}
                        style={classes.menuItemContainer}
                    >
                        <div style={classes.menuItemItems} onClick={() => handleElementAdded(index)}>{element.name}</div>
                        <div onClick={() => handleDelete(element.id)}>
                            {/*<DeleteOutline />*/}
                        </div>
                    </MenuItem>
                ))}

            </div>
        </Paper>}
    </div>
}