import React from 'react';
import UserInfo from './UserInfo';
import {formatDate} from '../utils';
import {Link} from 'react-router-dom';

export default class FollowListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      _id: null,
      userName: null,
      displayName: null,
      poets: [],
    };

    this.userFollow = this.userFollow.bind(this);
    this.userUnfollow = this.userUnfollow.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.userName !== undefined) {
      const poet = await this.app.poetDetail({userName: this.props.match.params.userName});
      this.setState(poet[0]);
    } else if (this.app.state.user) {
      const poet = await this.app.poetDetail({userName: this.app.state.user.userName});
      this.setState(poet[0]);
    }

    const poets = await this.app.followerList({
      userName: this.state.userName,
    });

    const userIds = poets.map((x) => x._id);
    const followingStatus = await this.app.followingStatus({
      token: this.app.state.token, userIds,
    });

    followingStatus.forEach((f, i) => {
      poets[i].isFollowing = f;
    });
    this.setState({poets});
  }

  async userFollow(id) {
    await this.app.userFollowUser({followId: id, token: this.app.state.token});
    const poets = await this.app.followerList({
      userName: this.state.userName,
    });

    const userIds = poets.map((x) => x._id);
    const followingStatus = await this.app.followingStatus({
      token: this.app.state.token, userIds,
    });

    followingStatus.forEach((f, i) => {
      poets[i].isFollowing = f;
    });
    this.setState({poets});
  }

  async userUnfollow(id) {
    await this.app.userUnfollowUser({unfollowId: id, token: this.app.state.token});
    const poets = await this.app.followerList({
      userName: this.state.userName,
    });

    const userIds = poets.map((x) => x._id);
    const followingStatus = await this.app.followingStatus({
      token: this.app.state.token, userIds,
    });

    followingStatus.forEach((f, i) => {
      poets[i].isFollowing = f;
    });
    this.setState({poets});
  }

  render() {
    const {poets, displayName} = this.state;

    return <div>
      <h3 class="Fz(24px)">{displayName}</h3>
      <div class="Fz(12px) C(gray)">
        <Link to={{pathname: `/poets/${this.state.userName}`}} class="Mx(6px) Cur(p) Td(u):h C(gray)">poems</Link>
        <Link to={{pathname: `/poets/${this.state.userName}/following`}} class="Mx(6px) Cur(p) Td(u):h C(gray)">following</Link>
        <Link to={{pathname: `/poets/${this.state.userName}/follower`}} class="Mx(6px) Cur(p) Td(u) C(gray)">follower</Link>
      </div>
      <div class="Maw(500px) Mx(a) Mt(12px)">
        {poets.map((poet) => <UserInfo key={poet._id} id={poet._id} userName={poet.userName}
          displayName={poet.displayName} lastActiveDate={formatDate(poet.lastActiveDate)} viewCount={poet.viewCount}
          followerCount={poet.followerCount} userFollow={this.userFollow} userUnfollow={this.userUnfollow}
          isFollowing={poet.isFollowing}/>)}
      </div>
    </div>;
  }
}
