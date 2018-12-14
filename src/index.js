import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom'

import FrontMainLayout from './layouts/frontMainLayout';
import {front, admin, mobile, userDetails} from './config/routeConstant';
import FrontUserDetailsLayout from "./layouts/frontUserDetailsLayout/FrontUserDetailsLayout";



ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path={front} exact component={FrontMainLayout}/>
      <Route path={mobile} exact component={FrontMainLayout}/>
      <Route path={userDetails} exact component={FrontUserDetailsLayout}/>
      <Route component={FrontMainLayout}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
