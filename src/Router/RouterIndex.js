import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginContainer from "../AuthRoutes/LoginContainer";
import HomeAdmin from "../AdminPanelFeature/components/HomeAdmin";
import CampaignAdmin from "../AdminPanelFeature/components/CampaignAdmin";
import ClientAdmin from "../AdminPanelFeature/components/ClientAdmin";
import DrawerComponent from "../CampaignsGalleryFeature/DrawerComponent";
import {useSelector} from "react-redux";
import AuthRoutes from "../AuthRoutes";
import Routes from './Routes';

export default function RouterIndex(props){
    const auth = useSelector(state => state.auth);
    return <Router>
        <Switch>
            <Routes />

        </Switch>
    </Router>
}