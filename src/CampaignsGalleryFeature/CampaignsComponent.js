import DrawerCampaignListComponent from "./components/DrawerCampaignListComponent";
import CampaignContainerComponent from "../CampaignContainerComponent";

export default function CampaignsComponent(props){
    return <>
        <DrawerCampaignListComponent />
        <CampaignContainerComponent />
    </>
}