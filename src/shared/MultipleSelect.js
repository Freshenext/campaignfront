import {Chip, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {useEffect, useState} from "react";
import {AddCircle} from "@material-ui/icons";

export default function MultipleSelect({label = '', data}){
    const [values, setValues] = useState([]);
    const [insertCategory, setInsertCategory] = useState({ name  : ""});
    const [dataForSelect, setDataForSelect] = useState([]);

    useEffect(() => {
        setDataForSelect(data);
    }, [data]);

    const handleChange = (e) => {
        console.log(e.target.value);
        setValues(e.target.value);
    }

    const handleInsertCategory = () => {
        dataForSelect.push(insertCategory);
        setInsertCategory({ name : ""});
    }
    return <FormControl fullWidth>

        <InputLabel id="select">{label}</InputLabel>
        <Select
            labelId="select"
            id="selectControl"
            multiple
            value={values}
            onChange={handleChange}
            input={<Input id="selectChip" />}
            renderValue={(selected) => {
                return <div>
                    {selected.map(selectedItem => {
                        return <Chip key={selectedItem.id || Math.random()} label={selectedItem.name}  />
                    })}
                </div>
            }}
        >
            <MenuItem onClick={undefined}>
                <TextField
                    variant="outlined"
                    label="Insert new category"
                    fullWidth
                    helperText="Robots, 600x600"
                    InputProps={{
                        endAdornment : <InputAdornment position={"end"} onClick={handleInsertCategory}><AddCircle /></InputAdornment>
                    }}
                    value={insertCategory.name}
                    onChange={e => setInsertCategory({ name: e.target.value })}
                />
            </MenuItem>
            {dataForSelect.map(dataItem => {
                return <MenuItem key={dataItem.id || Math.random()} value={dataItem}>
                    {dataItem.name}
                </MenuItem>
            })}
        </Select>
    </FormControl>

}