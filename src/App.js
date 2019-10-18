import React from 'react';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import PoemEditorPage from './components/PoemEditorPage';
import UserInfo from './components/UserInfo';
import ProfilePage from './components/ProfilePage';
import PropsRoute from './PropsRoute';
import PoetListingPage from './components/PoetListingPage';

import {Route, Link, Switch} from 'react-router-dom';
export default class App extends React.Component {
  render() {
    return <div class="Ta(c)">
      <PropsRoute path="/" component={Navbar}/>

      <Switch>
        <PropsRoute exact path="/" component={HomePage}/>
        <PropsRoute path="/me/following" component={ProfilePage} page="following"/>
        <PropsRoute path="/me/follower" component={ProfilePage} page="follower"/>
        <PropsRoute path="/me" component={ProfilePage}/>
        <PropsRoute path="/poets" component={PoetListingPage}/>
        <PropsRoute path="/login" component={LoginPage}/>
        <PropsRoute path="/register" component={RegisterPage}/>
        <PropsRoute path="/edit" component={PoemEditorPage}/>
        <PropsRoute path="/settings" component={SettingsPage}/>


        {/* <PropsRoute component={ErrorPage}/> */}
      </Switch>
      {/* <UserInfo name='E.E. Cummings' gender='Male' nationality='American' born='1894' death='1962'/>
      <PoemEditorPage/>
      <SettingsPage username="u1201171010" name="Charlene"/>
      <LoginPage/>
      <HomePage/> */}

    </div>;
  }
}


