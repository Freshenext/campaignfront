import './App.css';
import {Container, Drawer, Grid, MuiThemeProvider, createTheme} from "@material-ui/core";
import DrawerCampaignListComponent from "./CampaignsGalleryFeature/components/DrawerCampaignListComponent";
import CampaignContainerComponent from "./CampaignContainerComponent";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import DemosCrudComponent from "./DemosCrudComponent";
import CampaignsComponent from "./CampaignsGalleryFeature/CampaignsComponent";

const theme = createTheme({
    palette : {
        primary : {
            main : '#4791db'
        }
    }
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
        <Router>
            <Route path="/" exact>
                <DemosCrudComponent />
            </Route>
            <Route path="/campaigns" exact>
                <CampaignsComponent />
            </Route>
        </Router>
    </MuiThemeProvider>
  );
}

export default App;
