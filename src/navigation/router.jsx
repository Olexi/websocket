import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from 'pages/LoginPage/LoginPage';
import ChatPage from 'pages/ChatPage/ChatPage';

export default class RoutingComponent extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' exact children={<LoginPage />} />
          <Route path='/chat' exact children={<ChatPage />} />
          <Route path='/404' exact children={<div>404</div>}/>
          <Redirect path='*' to='/404'/>
          
        </Switch>
      </Router>
    )
  }
}