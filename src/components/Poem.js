import React from 'react';
import PoemInfo from './PoemInfo';
import {getAlignStyle, pushHistory} from '../utils';

export default class Poem extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      isExpanded: false,
      authorName: this.props.authorName,
      authorUserName: this.props.authorUserName,
      isFollowing: this.props.isFollowing || false,
      comments: [],
    };
    this.pushHistory = pushHistory.bind(this);
    this.expand=this.expand.bind(this);
    this.edit = this.edit.bind(this);
    this.detail = this.detail.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
    this.comment = this.comment.bind(this);
  }

  async componentDidMount() {
    if (!this.props.authorName) {
      try {
        const poet = await this.app.poetDetail({userId: this.props.authorId});
        let isFollowing;
        if (this.app.state.token !== null) {
          isFollowing = await this.app.followingStatus({token: this.app.state.token, userIds: [this.props.authorId]});
        } else {
          isFollowing = [false];
        }
        const comments = await this.app.commentList({poemId: this.props.id, token: this.app.state.token});
        this.setState({authorName: poet.displayName, authorUserName: poet.userName,
          isFollowing: isFollowing[0], comments: comments});
      } catch (err) {
        console.log(err);
      }
    }
  }

  expand() {
    this.setState({isExpanded: true});
    this.props.toVisit(this.props.id);
  }

  edit() {
    this.props.toEdit(this.props.id);
  }

  detail() {
    this.props.toDetail(this.props.id);
  }

  redirectToUserProfile() {
    this.props.redirectToUserProfile(this.state.authorUserName);
  }

  async like() {
    await this.props.like(this.props.id);
  }

  async unlike() {
    await this.props.unlike(this.props.id);
  }

  async follow() {
    await this.props.follow(this.props.authorId);
  }

  async unfollow() {
    await this.props.unfollow(this.props.authorId);
  }

  async comment() {
    await this.props.comment(this.props.authorId);
  }

  render() {
    const {id, authorId, align, title, body, preview,
      lastEditDate, isOwner, visibility, viewCount, commentCount, liked, likeCount,
      comments} = this.props;
    const {isExpanded, isFollowing, authorName} = this.state;

    return <div class="My(50px) Maw(500px) Mx(a)">
      <div class="C(lightgrey) Fz(14dpx)">
        <i class="fas fa-fire"></i> {viewCount}°
      </div>
      <div class={getAlignStyle(align)}>
        {isOwner &&
        <span class="Bgc(lightgray) D(ib) Px(4px) Py(0) Fz(10px) Bdrs(2px) Mend(10px)">{visibility}</span>}

        {isOwner &&
         <button class="Bgc(black) C(white) Py(0) Bdw(0) Fz(10px) Bdrs(2px)" onClick={this.edit}>edit</button>}
      </div>
      <div class={getAlignStyle(align)}>
        {!isOwner && <span> {authorName} • </span>}
        <span>{lastEditDate}</span>
      </div>
      <h3 class={`Fz(24px) Wob(2px) Cur(p):h `+ getAlignStyle(align)} onClick={this.detail}>
        {title}
      </h3>
      <p class={`Whs(pw) Wob(2px) `+ getAlignStyle(align)}>
        {!isExpanded ? (preview || body) : body}
      </p>
      {!isExpanded &&
         <span class="Cur(p) C(skyblue) Td(u):h" onClick={this.expand}>Continue reading...</span>}
      <PoemInfo authorId={authorId} authorName={authorName} likeCount={likeCount} poemId={id}
        commentCount={commentCount} isOwner={isOwner} isFollowing={isFollowing} liked={liked}
        redirectToUserProfile={this.redirectToUserProfile} like={this.like} unlike={this.unlike}
        follow={this.follow} unfollow={this.unfollow} comments={comments} comment={this.comment}
      />
    </div>;
  }
}
