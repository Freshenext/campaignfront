import {Button, Grid} from "@material-ui/core";
import {useEffect, useState} from "react";

export default function CampaignElementComponent({urlFull, name, url, isMobile, isDesktop}){
    const [isHovered, setIsHovered] = useState(false);
    const classes = ['gridFlexed', isMobile === false ? "hideOnMobile" : '', isDesktop === false ? "hideOnDesktop" : ""]
    console.log(isMobile,isDesktop);
    return (
        <Grid xs={12} sm={6} md={4} lg={3} className={classes.join(' ')}
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
                >Click here to go</Button>
            </div>}

        </Grid>
    )
}