import {Button, Grid} from "@material-ui/core";
import {useEffect, useState} from "react";

export default function CampaignElementComponent({urlFull, name, url, isMobile, isDesktop}){
    const [isHovered, setIsHovered] = useState(false);
    const classes = ['gridFlexed', isMobile === false ? "hideOnMobile" : '', isDesktop === false ? "hideOnDesktop" : ""]

    return (
        <Grid xs={6} sm={4} md={3} lg={3} className={classes.join(' ')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
        >
            <div className="divCampaign"

            >
                <img src={urlFull} className="imgCampaigns" />
                <span>{name}</span>
            </div>
            {isHovered && <div className={"divHiddenCampaign divHiddenOpacity hideOnMobile"}>
            </div>
            }
            {isHovered && <div className="divHiddenCampaign divHiddenCard hideOnMobile">
                <Button
                    variant="contained"
                    className="primaryBackgroundColor"
                    onClick={_ => window.open(url, '_blank')}
                    style={{ textTransform: "unset", borderRadius: '10px'}}

                >View Demo</Button>
            </div>}

        </Grid>
    )
}