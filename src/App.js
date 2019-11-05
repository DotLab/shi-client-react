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
import FollowPage from './components/FollowPage';

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
    this.setState({token: null});
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
      return poets.payload;
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

  async userPoem({token, poetId}) {
    const poems = await this.genericAPI('/v1/poets/poems', {token, poetId})
        .catch((e)=>{
          throw new Error(e);
        });
    if (poems) {
      return poems.payload;
    }
  }

  async userCreatePoem({title, body, visibility, token, align}) {
    const poem = await this.genericAPI('/v1/poems/create', {title, body, visibility, align, token})
        .catch((e)=>{
          throw new Error(e);
        });
    if (poem) {
      this.history.push(`/poems/${poem.payload}`);
    }
  }

  async poemDetail({poemId, token}) {
    const poem = await this.genericAPI('/v1/poems/detail', {poemId, token})
        .catch((e)=>{
          throw new Error(e);
        });
    if (poem) {
      return poem.payload;
    }
  }

  async poemEdit({poemId, title, body, visibility, align, token}) {
    const poem = await this.genericApi1('/v1/poems/edit', {poemId, title, body, visibility, align, token})
        .catch((e)=>{
          throw new Error(e);
        });
    if (poem) {
      this.history.push(`/poems/${poemId}`);
    }
  }

  async poemDelete({poemId, token}) {
    const poem = await this.genericAPI('/v1/poems/delete', {poemId, token})
        .catch((e)=>{
          throw new Error(e);
        });
    if (poem) {
      this.history.push('/me');
    }
  }

  async poemLike({poemId, token}) {
    await this.genericAPI('/v1/poems/like', {poemId, token})
        .catch((e)=>{
          throw new Error(e);
        });
  }

  async poemUnlike({poemId, token}) {
    await this.genericAPI('/v1/poems/unlike', {poemId, token})
        .catch((e)=>{
          throw new Error(e);
        });
  }

  async poemVisit({poemId, token}) {
    this.genericAPI('/v1/poems/visit', {poemId, token})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
  }

  async poetDetail({userName, userId}) {
    const poet = await this.genericAPI('/v1/poets/detail', {userName, userId})
        .catch((e)=>{
          throw new Error(e);
        });
    if (poet) {
      return poet.payload;
    }
  }

  async followerList({userName}) {
    const poets = await this.genericAPI('/v1/poets/follower', {userName})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (poets) {
      return poets.payload;
    }
  }

  async followingList({userName}) {
    const poets = await this.genericAPI('/v1/poets/following', {userName})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (poets) {
      return poets.payload;
    }
  }

  async followingStatus({token, userIds}) {
    const followingStatus = await this.genericAPI('/v1/poets/followingStatus', {token, userIds})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (followingStatus) {
      return followingStatus.payload;
    }
  }

  async likeStatus({token, poemIds}) {
    const likeStatus = await this.genericAPI('/v1/poems/likeStatus', {token, poemIds})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (likeStatus) {
      return likeStatus.payload;
    }
  }

  async poemList({token, filter, sort, order, limit, skip, search}) {
    const poems = await this.genericAPI('/v1/poems/home', {token, filter, sort, order, limit, skip, search})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (poems) {
      return poems.payload;
    }
  }

  async commentList({token, poemId, limit}) {
    const comments = await this.genericAPI('/v1/poems/comment-list', {token, poemId, limit})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
    if (comments) {
      return comments.payload;
    }
  }

  async comment({token, poemId, comment}) {
    await this.genericAPI('/v1/poems/comment', {token, poemId, comment})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
  }

  async commentDelete({token, commentId}) {
    await this.genericAPI('/v1/poems/comment/delete', {token, commentId})
        .catch((e)=>{
          console.log(e);
          throw new Error(e);
        });
  }

  render() {
    return <div class="Ta(c)">
      <PropsRoute path="/" component={Navbar} app={this}/>

      <Switch>
        <PropsRoute exact path="/" component={HomePage} app={this}/>
        <PropsRoute path="/me/following" component={FollowPage} page="following" app={this}/>
        <PropsRoute path="/me/follower" component={FollowPage} page="follower" app={this}/>
        <PropsRoute path="/me" component={UserProfilePage} app={this}/>
        <PropsRoute path="/poets/:userName/following"component={FollowPage} page="following" app={this}/>
        <PropsRoute path="/poets/:userName/follower"component={FollowPage} page="follower" app={this}/>
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


