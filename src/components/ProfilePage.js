import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';

import {formatDate, short} from '../utils';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.toEdit = this.toEdit.bind(this);
    this.toDetail = this.toDetail.bind(this);
    this.toPoem = this.toPoem.bind(this);
    this.toFollower = this.toFollower.bind(this);
    this.toFollowing = this.toFollowing.bind(this);
    this.toVisit = this.toVisit.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
    this.comment = this.comment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  toEdit(poemId) {
    this.props.redirectToEdit(poemId);
  }

  toDetail(poemId) {
    this.props.redirectToDetail(poemId);
  }

  toPoem(poemId) {
    this.props.redirectToPoem(poemId);
  }

  toFollower(poemId) {
    this.props.redirectToFollower(poemId);
  }

  toFollowing(poemId) {
    this.props.redirectToFollowing(poemId);
  }

  toVisit(poemId) {
    this.props.visitPoem(poemId);
  }

  like(poemId) {
    this.props.like(poemId);
  }

  unlike(poemId) {
    this.props.unlike(poemId);
  }

  follow() {
    this.props.follow();
  }

  unfollow() {
    this.props.unfollow();
  }

  redirectToUserProfile() {
    this.props.redirectToUserProfile();
  }

  async comment(body, poemId) {
    await this.props.comment(body, poemId);
  }

  async deleteComment(commentId) {
    await this.props.deleteComment(commentId);
  }

  render() {
    const {displayName, poems, isOwner, isFollowing} = this.props;
    return <div>
      <h3 class="Fz(24px)">
        {displayName}
      </h3>
      <div class="Fz(12px) C(gray)">
        <span class="Mx(6px) Cur(p) Td(u) C(gray)" onClick={this.toPoem}>poems</span>
        <span class="Mx(6px) Cur(p) Td(u):h C(gray)" onClick={this.toFollowing}>following</span>
        <span class="Mx(6px) Cur(p) Td(u):h C(gray)" onClick={this.toFollower}>follower</span>
      </div>
      <div>

        {poems.map((poem) => <Poem key={poem._id} id={poem._id} authorId={poem.authorId} authorName={displayName}
          align={poem.align} title={poem.title} body={poem.body} visibility={poem.visibility}
          lastEditDate={formatDate(poem.lastEditDate)} viewCount={poem.viewCount} likeCount={poem.likeCount}
          commentCount={poem.commentCount} preview={short(poem.body)} isOwner={isOwner} toEdit={this.toEdit}
          toDetail={this.toDetail} toVisit={this.toVisit} like={this.like} unlike={this.unlike}
          follow={this.follow} unfollow={this.unfollow}
          isFollowing={isFollowing} liked={poem.liked}
          redirectToUserProfile={this.redirectToUserProfile}
          app={this.app} comment={this.comment} deleteComment={this.deleteComment}
        />)}

      </div>
    </div>;
  }
}
