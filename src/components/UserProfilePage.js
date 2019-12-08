import React from 'react';
import ProfilePage from './ProfilePage';

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
    this.redirectToEdit = this.redirectToEdit.bind(this);
    this.redirectToDetail = this.redirectToDetail.bind(this);
  }

  async componentDidMount() {
    await this.app.userDetail({token: this.app.state.token});
    if (this.props.match.params.userName !== undefined) {
      const poet = await this.app.poetDetail({userName: this.props.match.params.userName});
      this.setState(poet.payload[0]);
    } else {
      const poet = await this.app.poetDetail({userName: this.app.state.user.userName});
      this.setState(poet.payload[0]);
    }

    const poems = await this.app.userPoem({token: this.app.state.token, poetId: this.state._id});
    if (poems) {
      this.setState({poems: poems.payload});
    }
  }

  redirectToEdit(poemId) {
    this.app.history.push(`/poems/${poemId}/edit`);
  }

  redirectToDetail(poemId) {
    this.app.history.push(`/poems/${poemId}`);
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
        redirectToDetail={this.redirectToDetail}/>
    </div>;
  }
}
