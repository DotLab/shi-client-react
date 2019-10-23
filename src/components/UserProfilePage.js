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
      this.setState(this.app.state.user);
      const poems = await this.app.userPoem({token: this.app.state.token, targetUser: this.state._id});
      if (poems) {
        this.setState({poems: poems.payload});
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const isLoggedIn = this.app.state.token;
    if (!isLoggedIn) {
      return <div>
        {UNAUTHORIZED}
      </div>;
    }

    const {displayName, poems} = this.state;

    return <div>
      <ProfilePage displayName={displayName} poems={poems} isOwner={true}/>
    </div>;
  }
}
