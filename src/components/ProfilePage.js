import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';

import {formatDate, short} from '../utils';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.toEdit = this.toEdit.bind(this);
    this.toDetail = this.toDetail.bind(this);
    this.toPoem = this.toPoem.bind(this);
    this.toFollower = this.toFollower.bind(this);
    this.toFollowing = this.toFollowing.bind(this);
    this.toVisit = this.toVisit.bind(this);
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

  render() {
    const {displayName, poems, isOwner} = this.props;
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

        {poems.map((poem) => <Poem key={poem._id} id={poem._id} author={displayName} align={poem.align} title={poem.title}
          body={poem.body} privacy={poem.privacy} lastEditDate={formatDate(poem.lastEditDate)}
          viewCount={poem.viewCount} likeCount={poem.likeCount} commentCount={poem.commentCount}
          preview={short(poem.body)} isOwner={isOwner} toEdit={this.toEdit} toDetail={this.toDetail}
          toVisit={this.toVisit}
        />)}

      </div>
    </div>;
  }
}
