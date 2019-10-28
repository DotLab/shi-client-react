import React from 'react';
import UserInfo from './UserInfo';
import {onChange, pushHistory, formatDate} from '../utils';
import {Link} from 'react-router-dom';

export default class FollowListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      _id: null,
      userName: null,
      poets: [],
    };

    this.onChange = onChange.bind(this);
    this.pushHistory = pushHistory.bind(this);

    this.userFollow = this.userFollow.bind(this);
    this.userUnfollow = this.userUnfollow.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.userName !== undefined) {
      const poet = await this.app.poetDetail({userName: this.props.match.params.userName});
      this.setState(poet.payload[0]);
    } else {
      const poet = await this.app.poetDetail({userName: this.app.state.user.userName});
      this.setState(poet.payload[0]);
    }

    try {
      if (this.props.page === 'following') {
        const poets = await this.app.followingList({
          userName: this.state.userName,
        });
        if (poets) {
          this.setState({poets: poets.payload});
          const userIds = [];
          poets.payload.forEach((x) => userIds.push(x._id));
          const followingStatus = await this.app.followingStatus({
            token: this.app.state.token, userIds,
          });
          if (followingStatus) {
            const tmp = this.state.poets;
            for (let i = 0; i < followingStatus.length; i++) {
              tmp[i].isFollowing = followingStatus[i];
            }
            this.setState({poets: tmp});
          }
        }
      } else {
        const poets = await this.app.followerList({
          userName: this.state.userName,
        });
        if (poets) {
          this.setState({poets: poets.payload});
          const userIds = [];
          poets.payload.forEach((x) => userIds.push(x._id));
          const followingStatus = await this.app.followingStatus({
            token: this.app.state.token, userIds,
          });
          if (followingStatus) {
            const tmp = this.state.poets;
            for (let i = 0; i < followingStatus.length; i++) {
              tmp[i].isFollowing = followingStatus[i];
            }
            this.setState({poets: tmp});
          }
        }
      }
    } catch (err) {
      console.log('error');
    }
  }

  async userFollow(id) {
    try {
      await this.app.userFollowUser({followId: id, token: this.app.state.token});
      this.pushHistory();
    } catch (err) {
      console.log(err);
    }
  }

  async userUnfollow(id) {
    try {
      await this.app.userUnfollowUser({unfollowId: id, token: this.app.state.token});
      this.pushHistory();
    } catch (err) {
      console.log(err);
    }
  }

  redirectToProfile() {
    this.app.history.push(`/poets/${this.state.userName}`);
  }

  render() {
    const {poets} = this.state;
    return <div>

      <div class="Fz(12px) C(gray)">
        <span class="Mx(6px) Cur(p) Td(u):h C(gray)" onClick={this.redirectToProfile}>poems</span>
      </div>
      <div class="Maw(500px) Mx(a) Mt(12px)">
        {poets.map((poet) => <UserInfo key={poet._id} id={poet._id} userName={poet.userName}
          displayName={poet.displayName} lastActiveDate={formatDate(poet.lastActiveDate)} viewCount={poet.viewCount}
          followerCount={poet.followerCount} userFollow={this.userFollow} userUnfollow={this.userUnfollow}
          isFollowing={poet.isFollowing} redirectToProfile={this.redirectToProfile}/>)}
      </div>
    </div>;
  }
}
