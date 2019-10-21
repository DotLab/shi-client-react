import React from 'react';
import axios from 'axios';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import PoemEditorPage from './components/PoemEditorPage';
import PoemPage from './components/Poem';
import PoemCreatePage from './components/PoemCreatePage';
import UserInfo from './components/UserInfo';
import ProfilePage from './components/ProfilePage';
import PropsRoute from './PropsRoute';
import PoetListingPage from './components/PoetListingPage';
import ChangePasswordPage from './components/ChangePasswordPage';

import {Route, Link, Switch} from 'react-router-dom';
import {resolve} from 'path';
import {reject} from 'q';
import Poem from './components/Poem';

const API_SUCCESS = 'SUCCESS';
const API_ERROR = 'ERROR';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history;

    this.state = {
      user: null,
      token: null,
      error: null,
    };
  }

  genericApi1(event, arg) {
    return new Promise((resolve, reject) => {
      axios.post(event, arg)
          .then(function(response) {
            console.log(response);
            if (response.data.status === API_SUCCESS) {
              console.log('resolve');
              return resolve(response.data);
            } else {
              console.log('reject');
              reject(response.data);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
    });
  }

  async userLogin({email, password}) {
    const token = await this.genericApi1('http://localhost:3000/v1/users/login', {email, password})
        .catch((e)=>{
          console.log(e);
        });
    // console.log(user.payload);

    if (token) {
      // console.log(token);
      this.setState({token: token.payload});
      this.userDetail({token: this.state.token});
      this.history.push('/');
    }
  }

  async userRegister({userName, email, displayName, password}) {
    const user = await this.genericApi1('http://localhost:3000/v1/users/register', {email, userName, displayName, password})
        .catch((e)=>{
          console.log(e);
        });
    if (user) {
      this.history.push('/login');
    }
  }

  async userChangePassword({currentPassword, newPassword, token}) {
    const user = await this.genericApi1('http://localhost:3000/v1/users/settings/password/change', {token, currentPassword, newPassword})
        .catch((e)=>{
          console.log(e);
        });
    if (user) {
      this.history.push('/login');
    }
  }

  async userDetail({token}) {
    const user = await this.genericApi1('http://localhost:3000/v1/users/detail', {token})
        .catch((e)=>{
          console.log(e);
        });
    if (user) {
      console.log(user);
      this.setState({user: user.payload});
    }
  }

  render() {
    const s = this.state;


    return <div class="Ta(c)">
      {s.token ? <div>
        ttttttttttthis is working
      </div>:
    <div>
      not logged in
    </div>}
      <PropsRoute path="/" component={Navbar} app={this}/>

      <Switch>
        <PropsRoute exact path="/" component={HomePage} app={this}/>
        <PropsRoute path="/settings/password" component={ChangePasswordPage} app={this}/>
        <PropsRoute path="/settings" component={SettingsPage} app={this}/>
        <PropsRoute path="/me/following" component={ProfilePage} page="following" app={this}/>
        <PropsRoute path="/me/follower" component={ProfilePage} page="follower" app={this}/>
        <PropsRoute path="/me" component={ProfilePage} app={this}/>
        <PropsRoute path="/poets" component={PoetListingPage} app={this}/>
        <PropsRoute path="/login" component={LoginPage} app={this} />
        <PropsRoute path="/register" component={RegisterPage} app={this}/>
        <PropsRoute path="/edit" component={PoemEditorPage} app={this}/>
        <PropsRoute path="/write" component={PoemCreatePage} app={this}/>
        <PropsRoute path="/:poemId" component={PoemPage} app={this}/>


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


