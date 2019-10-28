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
    };
    this.redirectToEdit = this.redirectToEdit.bind(this);
    this.redirectToDetail = this.redirectToDetail.bind(this);
    this.redirectToPoem = this.redirectToPoem.bind(this);
    this.redirectToFollower = this.redirectToFollower.bind(this);
    this.redirectToFollowing = this.redirectToFollowing.bind(this);
    this.visitPoem = this.visitPoem.bind(this);
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

  redirectToEdit(poemId) {
    this.app.history.push(`/poems/${poemId}/edit`);
  }

  redirectToDetail(poemId) {
    this.app.history.push(`/poems/${poemId}`);
  }

  redirectToPoem() {
    this.app.history.push(`/poets/${this.state.userName}`);
  }

  redirectToFollowing() {
    this.app.history.push(`/poets/${this.state.userName}/following`);
  }

  redirectToFollower() {
    this.app.history.push(`/poets/${this.state.userName}/follower`);
  }

  visitPoem(poemId) {
    this.app.poemVisit({poemId: poemId, token: this.app.state.token});
  }

  render() {
    let isOwner = true;
    if (!this.app.state.user || this.state._id !== this.app.state.user._id) {
      isOwner = false;
    }
    const {displayName, poems} = this.state;

    return <div>
      <ProfilePage displayName={displayName} poems={poems} isOwner={isOwner}
        redirectToEdit={this.redirectToEdit}
        redirectToDetail={this.redirectToDetail}
        redirectToPoem={this.redirectToPoem}
        redirectToFollower={this.redirectToFollower}
        redirectToFollowing={this.redirectToFollowing}
        visitPoem={this.visitPoem}
      />
    </div>;
  }
}
