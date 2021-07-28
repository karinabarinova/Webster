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

class App extends Component {

  render() {
    let routes = (
    	<Switch>
    		<Route path='/signin' exact component={SingIn}/>
    		<Route path='/reset' exact component={ResetPage} />
    		<Route path='/account' exact component={Account} />
    		<Route path='/' exact component={MainPage}/>
    	</Switch>
    )
    return (
      <>
        <Auth>
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