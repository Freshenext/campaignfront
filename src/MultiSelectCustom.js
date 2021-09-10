import {Chip, InputAdornment, MenuItem, Paper, TextField} from "@material-ui/core";
import {AddCircle, Delete, DeleteOutline, RemoveCircle} from "@material-ui/icons";
import {useEffect, useState} from "react";

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
        display: 'flex'
    },
    menuItemItems : {
        flex: '1'
    }
}

export default function MultiSelectCustom({elements = [], setSelectedValues, onAddNew = undefined, onDelete = undefined}){
    const [insertCategory, setInsertCategory] = useState({ name : ""});
    const [currentElements, setCurrentElements] = useState(elements);
    const [hideSelect, setHideSelect] = useState(true);
    const handleInsertCategory = (e) => {
        //dataForSelect.push(insertCategory);
        setInsertCategory({ name : e.target.value});
    }

    useEffect(() => {
        setCurrentElements(elements);
    },[elements]);

    const handleInsertCategoryEnter = (e) => {
        if(e.key === "Enter"){
            // Add category if not empty

            if(insertCategory.name !== ""){
                if(onAddNew)
                    onAddNew(insertCategory);
                currentElements.push(insertCategory);
                setInsertCategory({ name : ""});
            }
        }
    }

    useEffect(() => {
        setSelectedElements();
    }, [currentElements]);

    const setSelectedElements = () => {
        console.log("adding to array");
        setSelectedValues(currentElements.filter(element => element.isSelected));
    }

    const handleElementAdded = index => {
        currentElements[index].isSelected = currentElements[index].isSelected ? !currentElements[index].isSelected : true;
        setCurrentElements([...currentElements]);
    }

    const handleElementRemoved = selectedValue => {
        selectedValue.isSelected = 0;
        setCurrentElements([...currentElements]);
    }

    const handleDelete = id => {
        if(onDelete){
            onDelete(id);
        }
    }


    return <div className="containerMultiSelect">
        <div style={classes.selectedItemsContainer}>
            <div style={classes.selectedItemsFirst}>
                {currentElements.filter(element => element.isSelected).map(selectedValue => {
                    return <Chip
                        className="chipSelected"
                        label={selectedValue.name}
                        value={selectedValue.id || 0}
                        onDelete={_ => handleElementRemoved(selectedValue)}
                    />
                })}
            </div>
            <div  style={classes.selectedItemsSecond} onClick={() => setHideSelect(!hideSelect)}>show drop</div>
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
                {elements.map((element, index) => (
                    <MenuItem
                        selected={element.isSelected}
                        style={classes.menuItemContainer}
                    >
                        <div style={classes.menuItemItems} onClick={() => handleElementAdded(index)}>{element.name}</div>
                        <div onClick={() => handleDelete(element.id)}>
                            <DeleteOutline />
                        </div>
                    </MenuItem>
                ))}

            </div>
        </Paper>}
    </div>
}