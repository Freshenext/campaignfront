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

const columns = [{ name : 'name', label : 'Name of Campaign'}, { name : 'actions', label: 'Actions'}]

const options = {
    download : false,
    print : false,
    search : false,
    filter : false,
    viewColumns : false,
    selectableRows : false,

}

export default function ClientCampaignsDialog({ clientId, open = false, close, name, url }){
    const [campaigns, setCampaigns] = useState([]);
    const [request, requestObj] = useRequest()

    const fetchCampaigns = () => {
        fetchClientCampaigns(clientId)
            .then(({data}) => setCampaigns(data))
    }

    const handleCampaignClientUpdate = (campaignId) => {
        requestObj.setRequestLoading();
        customAxios.post(`/client/${clientId}/${campaignId}`)
            .then(({data}) => {
                requestObj.setRequestSuccess();
                fetchCampaigns();
            })
            .catch((error) => {
                requestObj.setRequestError(returnAxiosPromiseError(error));
            });
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
                        <Button
                            className='primaryBackgroundColor'
                            variant='contained'
                            onClick={() => handleCampaignClientUpdate(campaign.id)}
                        >Remove {request.status === 'loading' && ( <CircularProgress />)}</Button>
                        :
                        <Button
                            className='primaryBackgroundColor'
                            variant='contained'
                            onClick={() => handleCampaignClientUpdate(campaign.id)}
                        >Add {request.status === 'loading' && ( <CircularProgress />)}</Button>}))}
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