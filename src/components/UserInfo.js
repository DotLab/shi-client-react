import React from 'react';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.profile = this.profile.bind(this);
  }

  async follow(e) {
    e.preventDefault();
    try {
      await this.props.userFollow(this.props.id);
    } catch (err) {
      console.log(err);
    }
  }

  async unfollow(e) {
    e.preventDefault();
    try {
      await this.props.userUnfollow(this.props.id);
    } catch (err) {
      console.log(err);
    }
  }

  profile() {
    this.props.redirectToProfile(this.props.userName);
  }

  render() {
    const {displayName, lastActiveDate, isFollowing} = this.props;

    return <div>
      <div class="D(f) W(100%) Bgc(whitesmoke) P(10px) Mb(16px) Bdrs($bdrs-control) Ta(s)">
        <img class="Bdrs(100%) Mend(20px) D(b)" src="https://hellopoetry.s3.amazonaws.com/static/cache/0a/b7/0ab77aba9927aa7eaf46917bcab83c12.jpg" alt=""/>
        <div class="W(100%)">
          <span class="C(darkred) Td(u):h Cur(p):h" onClick={this.profile}>{displayName}</span>
          <br/>
          <span class="Fz(14px) C($gray-500)">last active: {lastActiveDate}</span>
        </div>
        <div class="As(c)">
          {!isFollowing && <button class="Bdc(t) Px(12px) Fz(12px) Mend(8px) W(80px) Bgc(lightgray) Bgc(darkred):h C(white):h Bdrs($control)" onClick={this.follow}>Follow</button>}
          {isFollowing &&<button class="Bdc(t) Px(12px) Fz(12px) Mend(8px) W(80px) Bgc(darkred) Bgc(lightgray):h C(white) Bdrs($control)" onClick={this.unfollow}>Following</button>}

        </div>
      </div>
    </div>;
  }
}
