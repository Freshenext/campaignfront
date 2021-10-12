import {useEffect, useState} from "react";
import {fetchClientCampaigns} from "../../../globalState/client/clientActions";
import MUIDataTable from 'mui-datatables';
import {
    Button, CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow
} from "@material-ui/core";
import customAxios from "../../../shared/customAxios";
import {returnAxiosPromiseError} from "../../../shared/utilities";
import useRequest from "../../../shared/hooks/useRequest";

const columns = [{ name : 'name', label : 'Name of Campaign'}, { name : 'actions', label: 'Actions', options: {
    setCellProps: () => ({ style : { width: '30%'}})
    }}]

const options = {
    download : false,
    print : false,
    search : true,
    filter : false,
    viewColumns : false,
    selectableRows : 'none',

}

export default function ClientCampaignsDialog({ clientId, open = false, close, name, url }){
    const [campaigns, setCampaigns] = useState([]);
    const [request, requestObj] = useRequest();
    const [currentEdited, setCurrentEdited] = useState(0);

    const fetchCampaigns = () => {
        fetchClientCampaigns(clientId)
            .then(({data}) => setCampaigns(data))
    }

    const handleCampaignClientUpdate = (campaignId) => {
        requestObj.setRequestLoading();
        setCurrentEdited(campaignId);
        customAxios.post(`/client/${clientId}/${campaignId}`)
            .then(({data}) => {
                requestObj.setRequestSuccess();
                fetchCampaigns();
            })
            .catch((error) => {
                requestObj.setRequestError(returnAxiosPromiseError(error));
            })
            .finally(() => setCurrentEdited(0));
    }
    useEffect(() => {
        fetchCampaigns();
    }, []);

    return <Dialog open={open} onClose={close} fullWidth maxWidth='lg'>
        <DialogTitle>Campaigns for Client {name}</DialogTitle>
        <DialogContent dividers>
            <MUIDataTable
                data={campaigns.map(campaign => ({
                    ...campaign,
                    actions : campaign.isClient === 1
                        ?
                        <>
                            <Button
                            className='primaryBackgroundColor'
                            variant='contained'
                            onClick={() => handleCampaignClientUpdate(campaign.id)}
                        >Remove</Button>
                            {request.status === 'loading' && currentEdited === campaign.id && (
                                <CircularProgress size={20} style={{ marginLeft: 10, verticalAlign: "middle"}} />
                            )}
                        </>
                        :
                        <>
                            <Button
                                className='primaryBackgroundColor'
                                variant='contained'
                                onClick={() => handleCampaignClientUpdate(campaign.id)}
                            >Add</Button>
                            {request.status === 'loading' && currentEdited === campaign.id && (
                                <CircularProgress size={20} style={{ marginLeft: 10, verticalAlign: "middle"}} />
                            )}

                        </>}))}
                columns={columns}
                options={options}
            />
            {/*<TableContainer component={Paper}>*/}
            {/*    <Table>*/}
            {/*        <TableHead>*/}
            {/*            <TableCell>Campaign Name</TableCell>*/}
            {/*            <TableCell>Actions</TableCell>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {campaigns.map(campaign => <CampaignTableRow {...campaign} /> )}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
        </DialogContent>
    </Dialog>
}

const CampaignTableRow = ({ name, isClient }) => {
    return <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>
            {isClient === 1 && (
                <Button variant='contained'>Remove</Button>
            )}
            {isClient === 0 && (
                <Button variant='contained'>Add to Client</Button>
            )}
        </TableCell>
    </TableRow>
}