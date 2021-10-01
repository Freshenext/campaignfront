import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useSelector} from "react-redux";
import ClientEditDialog from "./ClientEditDialog";
import {useState} from "react";
import useToggle from "../../../shared/hooks/useToggle";
import ClientCampaignsDialog from "./ClientCampaignsDialog";

export default function ClientDataTable(props){
    const { clients } = useSelector(state => state.client);
    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell>ACTIONS</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {clients.map((client) => (
                    <ClientTableRow key={client.id} {...client} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

const ClientTableRow = ({id, name, url}) => {
    const [open, toggleOpen] = useToggle();
    const [toggleCampaigns, setToggleCampaigns] = useToggle();
    return <TableRow >
        <TableCell>{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{url}</TableCell>
        <TableCell>
            <Button variant='contained' className='primaryBackgroundColor' style={{ marginRight: 10}}
             onClick={toggleOpen}>EDIT CLIENT</Button>
            <Button variant='contained' className='primaryBackgroundColor' onClick={setToggleCampaigns}>See Campaigns</Button>
            <ClientEditDialog {...({id, name, url})} toggle={toggleOpen} open={open}  />
            <ClientCampaignsDialog close={setToggleCampaigns} open={toggleCampaigns} clientId={id} {...({name, url})}  />
        </TableCell>
    </TableRow>
}