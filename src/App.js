import React from 'react';
import axios from 'axios';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import PoemEditorPage from './components/PoemEditorPage';
import UserProfilePage from './components/UserProfilePage';
import PropsRoute from './PropsRoute';
import PoetListingPage from './components/PoetListingPage';
import ChangePasswordPage from './components/ChangePasswordPage';

import {Route, Link, Switch} from 'react-router-dom';

const API_SUCCESS = 'SUCCESS';
const API_URL = 'http://localhost:3000';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history;
    this.state = {
      user: null,
      token: '',
      error: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({token: token});
    }
  }

  genericAPI(event, arg) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + event, arg)
          .then(function(response) {
            if (response.data.status === API_SUCCESS) {
              return resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
    });
  }

  async userLogin({email, password}) {
    const token = await this.genericAPI('/v1/users/login', {email, password})
        .catch((e)=>{
          throw new Error(e);
        });

    if (token) {
      localStorage.setItem('token', token.payload);
      this.setState({token: token.payload});
      this.userDetail({token: token.payload});
      this.history.push('/');
    }
  }

  async userLogOut() {
    localStorage.removeItem('token');
    this.setState({token: ''});
    this.history.push('/');
  }

  async userRegister({userName, email, displayName, password}) {
    const user = await this.genericAPI('/v1/users/register', {email, userName, displayName, password})
        .catch((e)=>{
          throw new Error(e);
        });
    if (user) {
      this.history.push('/login');
    }
  }

  async userChangePassword({currentPassword, newPassword, token}) {
    const user = await this.genericAPI('/v1/users/settings/password/change', {token, currentPassword, newPassword})
        .catch((e)=>{
          throw new Error(e);
        });
    if (user) {
      this.history.push('/login');
    }
  }

  async userDetail({token}) {
    const user = await this.genericAPI('/v1/users/detail', {token})
        .catch((e)=>{
          throw new Error(e);
        });
    if (user) {
      this.setState({user: user.payload});
    }
  }

  async userList({token, filter, sort, order, limit, skip, activeYearLimit, search}) {
    const poets = await this.genericAPI('/v1/poets', {token, filter, sort, order, limit, skip, activeYearLimit, search})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (poets) {
      return poets;
    }
  }

  async userFollowUser({token, followId}) {
    await this.genericAPI('/v1/users/follow', {token, followId})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
  }

  async userUnfollowUser({token, unfollowId}) {
    await this.genericAPI('/v1/users/unfollow', {token, unfollowId})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
  }

  async userPoem({token, targetUser}) {
    const poems = await this.genericAPI('/v1/poets/poems', {token, targetUser})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (poems) {
      return poems;
    }
  }

  render() {
    return <div class="Ta(c)">
      <PropsRoute path="/" component={Navbar} app={this}/>

      <Switch>
        <PropsRoute exact path="/" component={HomePage} app={this}/>
        <PropsRoute path="/me/following" component={UserProfilePage} page="following" app={this}/>
        <PropsRoute path="/me/follower" component={UserProfilePage} page="follower" app={this}/>
        <PropsRoute path="/me" component={UserProfilePage} app={this}/>
        <PropsRoute path="/user/:userName" component={UserProfilePage} app={this}/>
        <PropsRoute path="/poets" component={PoetListingPage} app={this}/>
        <PropsRoute path="/login" component={LoginPage} app={this} />
        <PropsRoute path="/register" component={RegisterPage} app={this}/>
        <PropsRoute path="/write" component={PoemEditorPage} app={this}/>
        <PropsRoute path="/settings/password" component={ChangePasswordPage} app={this}/>
        <PropsRoute path="/settings" component={SettingsPage} app={this}/>


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


