import {Grid} from "@material-ui/core";
import {useEffect} from "react";
import CampaignElementComponent from "./CampaignsGalleryFeature/components/CampaignElementComponent";
import {useSelector} from "react-redux";
import campaignActions from "./globalState/campaigns/campaignActions";
export default function CampaignContainerComponent(){
    const { campaign : {campaigns}, category : { selectedCategory, categorySearch }} = useSelector(state => state);

    return <Grid container>
        {campaigns.filter(campaign => {
            var isTrue = false;
            if (
                Object.keys(selectedCategory).length > 0
                && selectedCategory.categoryName !== undefined
                && selectedCategory.isException !== 1
            ){
                if(campaign.categories?.length > 0){
                    isTrue = campaign.categories.split(',')
                        .filter(singleCategory => selectedCategory.categoryName === singleCategory).length > 0;
                }
            } else if (campaign.name.toLowerCase().includes(categorySearch.toLowerCase())){
                isTrue =  true;
            }
            return isTrue;
        })
            .map(campaign => {
            return <CampaignElementComponent {...campaign} />
        })}
    </Grid>
}