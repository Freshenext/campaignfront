import './App.css';
import {MuiThemeProvider, createTheme} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DrawerComponent from "./CampaignsGalleryFeature/DrawerComponent";
import {Provider} from "react-redux";
import storeRedux, { persistor } from "./globalState/storeRedux";
import { PersistGate } from "redux-persist/integration/react";
import AuthRoutes from "./AuthRoutes";
import LoginContainer from "./AuthRoutes/LoginContainer";
import HomeAdmin from "./AdminPanelFeature/components/HomeAdmin";
import CampaignAdmin from "./AdminPanelFeature/components/CampaignAdmin";
import ClientAdmin from "./AdminPanelFeature/components/ClientAdmin";
import RouterIndex from "./Router/RouterIndex";
const theme = createTheme({
    palette : {
        primary : {
            main : '#4791db'
        }
    }
});
function App() {
  return (
      <Provider store={storeRedux}>
          <PersistGate loading={"Loading..."} persistor={persistor}>
              <MuiThemeProvider theme={theme}>
                  <RouterIndex />
              </MuiThemeProvider>
          </PersistGate>
      </Provider>
  );
}

export default App;
