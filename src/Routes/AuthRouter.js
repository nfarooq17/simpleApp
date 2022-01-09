import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from '../Pages/Login';
import Registeration from "../Pages/Registeration";
import WelcomPage from '../Pages/WelcomPage'

function AuthRouter(props) {
 
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomPage />
        </Route>
        {/* {authContext.user && <Route path="/Login" component={Login}></Route>} */}
        <Route path="/login" component={Login}></Route>
        <Route path="/registeration" component={Registeration}></Route>
        











      </Switch>
    </Router>
  );
}

export default AuthRouter;
