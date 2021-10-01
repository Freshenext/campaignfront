import useToggle from "../../../shared/hooks/useToggle";
import ClientCreateDialog from "./ClientCreateDialog";
import {Button} from "@material-ui/core";
import Template from "../Template";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchClients, setSuccessMessage} from "../../../globalState/client/clientActions";
import CustomSnackbarComponent from "../../../CustomSnackbarComponent";
import ClientDataTable from "./ClientDataTable";
import ClientCampaignsDialog from "./ClientCampaignsDialog";

export default function ClientAdmin(props){
    const [create, setCreate] = useToggle();
    const { clients, successMessage } = useSelector(state => state.client);
    useEffect(() => {
        fetchClients();
    }, []);

    return <Template>
        {successMessage !== '' && <CustomSnackbarComponent message={successMessage} />}
        <ClientCreateDialog toggle={setCreate} open={create} />
        <Button variant="contained" onClick={setCreate}>Create New Client </Button>
        <ClientDataTable />
    </Template>
}