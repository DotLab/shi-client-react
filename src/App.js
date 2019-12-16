import React from 'react';
import axios from 'axios';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import PoemEditorPage from './components/PoemEditorPage';
import UserProfilePage from './components/UserProfilePage';
import PoemCreatePage from './components/PoemCreatePage';
import PoemDetailPage from './components/PoemDetailPage';
import PropsRoute from './PropsRoute';
import PoetListingPage from './components/PoetListingPage';
import ChangePasswordPage from './components/ChangePasswordPage';
import FollowerPage from './components/FollowerPage';
import FollowingPage from './components/FollowingPage';

import {Route, Link, Switch} from 'react-router-dom';

const API_SUCCESS = 'SUCCESS';
const API_URL = 'http://localhost:3000';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history;
    this.state = {
      user: null,
      token: localStorage.getItem('token'),
      error: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({token});
    }
  }

  genericApi1(event, arg) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + event, arg).then((response) => {
        if (response.data.status === API_SUCCESS) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      }).catch((err) => reject(err));
    });
  }

  async userLogin({email, password}) {
    const res = await this.genericApi1('/v1/users/login', {email, password});
    const token = res.payload;

    localStorage.setItem('token', token);
    this.setState({token});
    this.userDetail({token});
    this.history.push('/');
  }

  async userLogOut() {
    localStorage.removeItem('token');
    this.setState({token: null});
    this.history.push('/');
  }

  async userRegister({userName, email, displayName, password}) {
    await this.genericApi1('/v1/users/register', {email, userName, displayName, password});
    this.history.push('/login');
  }

  async userChangePassword({currentPassword, newPassword, token}) {
    await this.genericApi1('/v1/users/settings/password/change', {token, currentPassword, newPassword});
    this.history.push('/login');
  }

  async userDetail({token}) {
    const res = await this.genericApi1('/v1/users/detail', {token});
    this.setState({user: res.payload});
  }

  async userList({token, filter, sort, order, limit, skip, activeYearLimit, search}) {
    const res = await this.genericApi1('/v1/poets', {token, filter, sort, order, limit, skip, activeYearLimit, search});
    return res.payload;
  }

  async userFollowUser({token, followId}) {
    await this.genericApi1('/v1/users/follow', {token, followId});
  }

  async userUnfollowUser({token, unfollowId}) {
    await this.genericApi1('/v1/users/unfollow', {token, unfollowId});
  }

  async userPoem({token, poetId}) {
    const res = await this.genericApi1('/v1/poets/poems', {token, poetId});
    return res.payload;
  }

  async userCreatePoem({title, body, visibility, token, align}) {
    const res = await this.genericApi1('/v1/poems/create', {title, body, visibility, align, token});
    this.history.push(`/poems/${res.payload}`);
  }

  async poemDetail({poemId, token}) {
    const res = await this.genericApi1('/v1/poems/detail', {poemId, token});
    return res.payload;
  }

  async poemEdit({poemId, title, body, visibility, align, token}) {
    await this.genericApi1('/v1/poems/edit', {poemId, title, body, visibility, align, token});
    this.history.push(`/poems/${poemId}`);
  }

  async poemDelete({poemId, token}) {
    await this.genericApi1('/v1/poems/delete', {poemId, token});
    this.history.push('/me');
  }

  async poemLike({poemId, token}) {
    await this.genericApi1('/v1/poems/like', {poemId, token});
  }

  async poemUnlike({poemId, token}) {
    await this.genericApi1('/v1/poems/unlike', {poemId, token});
  }

  async poemVisit({poemId, token}) {
    this.genericApi1('/v1/poems/visit', {poemId, token});
  }

  async poetDetail({userName, userId}) {
    const res = await this.genericApi1('/v1/poets/detail', {userName, userId});
    return res.payload;
  }

  async followerList({userName}) {
    const res = await this.genericApi1('/v1/poets/follower', {userName});
    return res.payload;
  }

  async followingList({userName}) {
    const res = await this.genericApi1('/v1/poets/following', {userName});
    return res.payload;
  }

  async followingStatus({token, userIds}) {
    const res = await this.genericApi1('/v1/poets/followingStatus', {token, userIds});
    return res.payload;
  }

  async likeStatus({token, poemIds}) {
    const res = await this.genericApi1('/v1/poems/likeStatus', {token, poemIds});
    return res.payload;
  }

  async poemList({token, filter, sort, order, limit, skip, search}) {
    const res = await this.genericApi1('/v1/poems/home', {token, filter, sort, order, limit, skip, search});
    return res.payload;
  }

  async commentList({token, poemId, limit}) {
    const comments = await this.genericApi1('/v1/poems/comment/list', {token, poemId, limit});
    return comments.payload;
  }

  async comment({token, poemId, comment}) {
    await this.genericApi1('/v1/poems/comment', {token, poemId, comment});
  }

  async commentDelete({token, commentId}) {
    await this.genericApi1('/v1/poems/comment/delete', {token, commentId});
  }

  render() {
    return <div class="Ta(c)">
      <PropsRoute path="/" component={Navbar} app={this}/>

      <Switch>
        <PropsRoute exact path="/" component={HomePage} app={this}/>
        <PropsRoute path="/me/following" component={FollowingPage} app={this}/>
        <PropsRoute path="/me/follower" component={FollowerPage} app={this}/>
        <PropsRoute path="/me" component={UserProfilePage} app={this}/>
        <PropsRoute path="/poets/:userName/following"component={FollowingPage} app={this}/>
        <PropsRoute path="/poets/:userName/follower"component={FollowerPage} app={this}/>
        <PropsRoute path="/poets/:userName" component={UserProfilePage} app={this}/>
        <PropsRoute path="/poets" component={PoetListingPage} app={this}/>
        <PropsRoute path="/login" component={LoginPage} app={this} />
        <PropsRoute path="/register" component={RegisterPage} app={this}/>
        <PropsRoute path="/write" component={PoemCreatePage} app={this}/>
        <PropsRoute path="/poems/:poemId/edit" component={PoemEditorPage} app={this}/>
        <PropsRoute path="/poems/:poemId" component={PoemDetailPage} app={this}/>
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


