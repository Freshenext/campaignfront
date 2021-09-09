import {useState} from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export default function useCheckbox(label, isChecked = false){
    const [checked, setChecked] = useState(isChecked);
    const checkbox = <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label={label} />
    return [checked, checkbox];
}