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
  }

  async componentDidMount() {
    if (this.props.match.params.userName !== undefined) {
      const poet = await this.app.poetDetail({userName: this.props.match.params.userName});
      this.setState(poet[0]);
    } else {
      const poet = await this.app.poetDetail({userName: this.app.state.user.userName});
      this.setState(poet[0]);
    }

    const followStatus = await this.app.followingStatus({token: this.app.state.token, userIds: [this.state._id]});
    this.setState({isFollowing: followStatus[0]});

    const poems = await this.app.userPoem({token: this.app.state.token, poetId: this.state._id});
    this.setState({poems: poems});
  }


  visitPoem(poemId) {
    this.app.poemVisit({poemId: poemId, token: this.app.state.token});
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
      />
    </div>;
  }
}
