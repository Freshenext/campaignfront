import DrawerComponent from "./DrawerComponent";
import CampaignsThumbnailsComponent from "./CampaignsThumbnailsComponent";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchClientCampaignsCategories} from "../globalState/client/clientActions";
import campaignActions from "../globalState/campaigns/campaignActions";
import categoriesActions from "../globalState/categories/categoriesActions";
import {CssBaseline} from "@material-ui/core";

export default function CampaignGalleryContainer(props){
    const {clientUrl} = useParams();

    useEffect(() => {
        if(clientUrl){
            fetchClientCampaignsCategories(clientUrl);
        } else {
            campaignActions.fetchCampaigns(clientUrl);
            categoriesActions.fetchCategories();
        }
    }, [])


    return <div style={{ display: 'flex'}}>
        <CssBaseline />
        <DrawerComponent />
        <CampaignsThumbnailsComponent />
    </div>
}