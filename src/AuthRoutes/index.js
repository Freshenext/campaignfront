import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import HomeAdmin from "../AdminPanelFeature/components/HomeAdmin";
import CampaignAdmin from "../AdminPanelFeature/components/CampaignAdmin";
import ClientAdmin from "../AdminPanelFeature/components/ClientAdmin";

export default function AuthRoutes({ location : { pathname} }){
    // Auth
    const auth = useSelector(state => state.auth);

    if(!auth.username && pathname.includes('/admin')){
        return <Redirect to='/login' />
    }
    const routes=  [
        {
            path: '/admin',
            component : HomeAdmin
        },
        {
            path: '/admin/campaign',
            component : CampaignAdmin
        },
        {
            path: '/admin/client',
            component: ClientAdmin
        }
    ]
    return routes.map(route => <Route path={route.path} component={route.component} exact />);
}