import React, { useEffect, useState } from "react";
import Homepage from "./Login/Homepage";
import Login from "./Login/Login";
import Dashboard from "./Login/Dashboard";
import Register from "./Login/Register";
import ServerStatus from "./editData/ServerStatus";
import EditPage from "./editData/EditPage";
import AddPage from "./editData/AddPage";
import Filler from "./editData/Filler";

import firebase from "./firebase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const theme = createMuiTheme();
export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/serverstatus" component={ServerStatus} />
          <Route exact path="/editpage" component={EditPage} />
          <Route exact path="/addpage" component={AddPage} />
          <Route exact path="/filler" component={Filler} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
