import {Button, Container, Grid} from "@material-ui/core";
import useStore from "./globalState/store";
import {useEffect} from "react";
import CampaignElementComponent from "./CampaignsGalleryFeature/components/CampaignElementComponent";
import {useDispatch, useSelector} from "react-redux";
import campaignActions from "./globalState/campaigns/campaignActions";
export default function CampaignContainerComponent(){
    const { campaign : {campaigns}, category : { selectedCategory }} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(campaignActions.fetchCampaigns());
    }, []);

    return <Grid container>
        {campaigns.filter(campaign => {
            if(Object.keys(selectedCategory).length > 0 && selectedCategory.id !== undefined){
                if(campaign.Categories.length > 0){
                    return campaign.Categories.filter(cat => selectedCategory.id === cat.id).length > 0;
                }
            } else return true;
        })
            .map(campaign => {
            return <CampaignElementComponent {...campaign} />
        })}
    </Grid>
}