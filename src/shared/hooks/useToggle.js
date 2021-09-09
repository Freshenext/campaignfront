import {useState} from "react";

export default function useToggle(){
    const [toggle, setToggle] = useState(false);
    const setToggleVar = _ => {
        setToggle(!toggle);
    }
    return [toggle, setToggleVar];
}