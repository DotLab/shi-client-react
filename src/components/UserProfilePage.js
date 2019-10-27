import React from 'react';
import ProfilePage from './ProfilePage';

import {UNAUTHORIZED} from '../utils';

export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      _id: null,
      displayName: null,
      followingCount: 0,
      followerCount: 0,
      viewCount: 0,
      poems: [],
    };
  }

  async componentDidMount() {
    try {
      await this.app.userDetail({token: this.app.state.token});
    } catch (err) {
      console.log(err);
    }
    if (this.props.match.params.userName !== undefined) {
      const poet = await this.app.poetDetail({userName: this.props.match.params.userName});
      this.setState(poet.payload[0]);
    } else {
      console.log(this.app.state.user);
      const poet = await this.app.poetDetail({userName: this.app.state.user.userName});
      this.setState(poet.payload[0]);
    }


    try {
      const poems = await this.app.userPoem({token: this.app.state.token, poetId: this.state._id});
      if (poems) {
        this.setState({poems: poems.payload});
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let isOwner = true;
    if (!this.app.state.user || this.state._id !== this.app.state.user._id) {
      isOwner = false;
    }
    console.log(this.app.state.user);

    const {displayName, poems} = this.state;

    return <div>
      <ProfilePage displayName={displayName} poems={poems} isOwner={isOwner}/>
    </div>;
  }
}
