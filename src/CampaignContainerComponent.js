import {Button, Container, Grid} from "@material-ui/core";
import useStore from "./store";
import {useEffect} from "react";

export default function CampaignContainerComponent(){
    const { campaigns, fetchCampaigns } = useStore(state => state);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return <Grid container>
        {campaigns.map(campaign => {
            return <Grid xs={4} className="gridFlexed">
                <div className="divCampaign">
                    <img src={campaign.urlFull} className="imgCampaigns" />
                    <span>{campaign.name}</span>
                </div>
                <div className="divHiddenCampaign divHiddenOpacity">
                    123
                </div>
                <div className="divHiddenCampaign divHiddenCard">
                    <Button
                        variant="contained"
                        className="primaryBackgroundColor"
                        onClick={_ => window.open(campaign.url, '_blank')}
                    >Click here to go</Button>
                </div>
            </Grid>
        })}
        <Grid xs={3} item>
            <img src="" />
        </Grid>
    </Grid>
}