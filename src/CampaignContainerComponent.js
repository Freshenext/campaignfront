import {Button, Container, Grid} from "@material-ui/core";
import useStore from "./store";
import {useEffect} from "react";
import CampaignElementComponent from "./CampaignsGalleryFeature/components/CampaignElementComponent";

export default function CampaignContainerComponent(){
    const { campaigns, fetchCampaigns, categorySearch, selectedCategory } = useStore(state => state);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return <Grid container>
        {campaigns.filter(campaign => {

            if(Object.keys(selectedCategory).length > 0){
                return campaign.category.includes(selectedCategory.name);
            } else return true;
        })
            .map(campaign => {
            return <CampaignElementComponent {...campaign} />
        })}
    </Grid>
}