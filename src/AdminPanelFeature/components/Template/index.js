import CustomAppBar from "../AppBar";
import {Container} from "@material-ui/core";
import CustomDrawer from "../Drawer";
import useToggle from "../../../shared/hooks/useToggle";
import {fetchCategories} from "../../../globalState/categories/categoriesParametersActions";

export default function Template({children, ...rest}){
    const [toggleDrawer, setToggleDrawer] = useToggle(false);
    return <>
        <CustomAppBar toggle={setToggleDrawer} />
        <CustomDrawer open={toggleDrawer} toggle={setToggleDrawer} />
        <Container maxWidth='lg'>
            {children}
        </Container>

    </>
}