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
    }
}

export default function MultiSelectCustom({elements = [], setSelectedValues}){
    const [insertCategory, setInsertCategory] = useState({ name : ""});
    const [currentElements, setCurrentElements] = useState(elements);
    const handleInsertCategory = (e) => {
        //dataForSelect.push(insertCategory);
        setInsertCategory({ name : e.target.value});
    }

    const handleInsertCategoryEnter = (e) => {
        if(e.key === "Enter"){
            // Add category if not empty
            if(insertCategory.name !== ""){
                console.log("pushing");
                currentElements.push(insertCategory);
                console.log("pushed");
                setInsertCategory({ name : ""});
            }
        }
    }

    useEffect(() => {
        setSelectedElements();
    }, [currentElements]);

    const setSelectedElements = () => {
        setSelectedValues(currentElements.filter(element => element.isSelected));
    }

    const handleElementAdded = index => {
        currentElements[index].isSelected = currentElements[index].isSelected ? !currentElements[index].isSelected : true;
        setCurrentElements([...currentElements]);
    }

    useEffect(_ => {
        console.log(currentElements);
    }, [currentElements]);

    const handleElementRemoved = selectedValue => {
        selectedValue.isSelected = 0;
        setCurrentElements([...currentElements]);
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
            <div  style={classes.selectedItemsSecond}>show drop</div>
        </div>
        <Paper elevation={3} className="selectContainerMultiSelect">
            <div className="addMultiSelect">
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
            <div className="optionsMultiSelect">
                {currentElements.map((element, index) => (
                    <MenuItem
                        onClick={() => handleElementAdded(index)}
                        selected={element.isSelected}
                    >
                        {element.name}
                    </MenuItem>
                ))}

            </div>
        </Paper>
    </div>
}