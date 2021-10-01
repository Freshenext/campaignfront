import AuthRoutes from "../AuthRoutes";
import {Route, Switch} from "react-router-dom";
import LoginContainer from "../AuthRoutes/LoginContainer";
import CampaignGalleryContainer from "../CampaignsGalleryFeature/CampaignGalleryContainer";

export default function Routes({ location }){
    if(location.pathname.includes('/admin')){
        return <AuthRoutes location={location} />
    }

    return <Switch>
        <Route path='/login' component={LoginContainer} exact />
        <Route path='/:clientUrl' exact component={CampaignGalleryContainer} />
        <Route path="/" component={CampaignGalleryContainer} />
    </Switch>
}