import React, { Component } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Page from './components/Page';
import Account from './pages/account';
import SingIn from './pages/signin';
import ResetPage from './pages/reset';
import Auth from './store/auth/auth';
import FeedbackWidget from "./components/Feedback";
import CookieConsentWidget from "./components/CookieConsentWidget";
import MainPage from './components/MainPage'
import Editor from './pages/editor'
import GlobalStyle from './globalStyles';
import MadeWithWebster from './components/MadeWithWebster';

class App extends Component {

  render() {
    let routes = (
    	<Switch>
    		<Route path='/signin' exact component={SingIn}/>
    		<Route path='/reset' exact component={ResetPage} />
    		<Route path='/profile' exact component={Account} />
        <Route path='/new-project' exact component={Editor} />
        <Route path='/made-on-webster' exact component={MadeWithWebster} />
    		<Route path='/' exact component={MainPage}/>
    	</Switch>
    )
    return (
      <>
        <Auth>
            <GlobalStyle />
            <Page>
                {routes}
                <FeedbackWidget />
                <CookieConsentWidget />
            </Page>  
        </Auth>
      </>
    );
  }
}

export default App;
