import './App.css';
import {MuiThemeProvider, createTheme} from "@material-ui/core";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import DrawerComponent from "./CampaignsGalleryFeature/DrawerComponent";
import AdminAreaContainer from "./AdminAreaContainer";

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
                <AdminAreaContainer />
            </Route>
            <Route path="/campaigns" exact>
                <DrawerComponent />
            </Route>
        </Router>
    </MuiThemeProvider>
  );
}

export default App;
