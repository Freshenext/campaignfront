import './App.css';
import {Container, Drawer, Grid} from "@material-ui/core";
import DrawerCampaignListComponent from "./DrawerCampaignListComponent";
import CampaignContainerComponent from "./CampaignContainerComponent";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import DemosCrudComponent from "./DemosCrudComponent";
function App() {
  return (
    <Router>
        <Route path="/" exact>
            <DemosCrudComponent />
        </Route>
        <Route path="/campaigns" exact>
            <Drawer anchor={"left"} open={true} variant="permanent" >
                <DrawerCampaignListComponent />
            </Drawer>
            <CampaignContainerComponent />
        </Route>
    </Router>
  );
}

export default App;
