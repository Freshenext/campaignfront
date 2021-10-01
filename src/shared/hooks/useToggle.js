import {useState} from "react";

export default function useToggle(initState = false){
    const [toggle, setToggle] = useState(initState);
    const setToggleVar = _ => {
        setToggle(!toggle);
    }
    return [toggle, setToggleVar];
}