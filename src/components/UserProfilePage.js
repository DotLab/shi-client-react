import React from 'react';
import ProfilePage from './ProfilePage';

export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      _id: null,
      userName: null,
      displayName: null,
      followingCount: 0,
      followerCount: 0,
      viewCount: 0,
      poems: [],
      isFollowing: false,
    };

    this.visitPoem = this.visitPoem.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.userName !== undefined) {
      const poet = await this.app.poetDetail({userName: this.props.match.params.userName});
      this.setState(poet[0]);
    } else if (this.app.state.user) {
      const poet = await this.app.poetDetail({userName: this.app.state.user.userName});
      this.setState(poet[0]);
    }

    const followStatus = await this.app.followingStatus({token: this.app.state.token, userIds: [this.state._id]});
    this.setState({isFollowing: followStatus[0]});

    const poems = await this.app.userPoem({token: this.app.state.token, poetId: this.state._id});
    this.setState({poems: poems});
  }

  visitPoem(poemId) {
    if (this.app.state.token) {
      this.app.poemVisit({poemId: poemId, token: this.app.state.token});
    }
  }

  async like(poemId) {
    if (this.app.state.token === null) return;
    await this.app.poemLike({poemId: poemId, token: this.app.state.token});
    const poems = await this.app.userPoem({token: this.app.state.token, poetId: this.state._id});
    this.setState({poems: poems});
  }

  async unlike(poemId) {
    if (this.app.state.token === null) return;
    await this.app.poemUnlike({poemId: poemId, token: this.app.state.token});
    const poems = await this.app.userPoem({token: this.app.state.token, poetId: this.state._id});
    this.setState({poems: poems});
  }

  async follow() {
    if (this.app.state.token === null) return;
    await this.app.userFollowUser({followId: this.state._id, token: this.app.state.token});
    const follow = await this.app.followingStatus({userIds: [this.state._id], token: this.app.state.token});
    this.setState({isFollowing: follow[0]});
  }

  async unfollow() {
    if (this.app.state.token === null) return;
    await this.app.userUnfollowUser({unfollowId: this.state._id, token: this.app.state.token});
    const follow = await this.app.followingStatus({userIds: [this.state._id], token: this.app.state.token});
    this.setState({isFollowing: follow[0]});
  }

  render() {
    let isOwner = true;
    if (!this.app.state.user || this.state._id !== this.app.state.user._id) {
      isOwner = false;
    }
    const {displayName, userName, poems, isFollowing} = this.state;

    return <div>
      <ProfilePage displayName={displayName} userName={userName} poems={poems} isOwner={isOwner}
        visitPoem={this.visitPoem}
        isFollowing={isFollowing}
        like={this.like} unlike={this.unlike}
        follow={this.follow} unfollow={this.unfollow}
      />
    </div>;
  }
}
