import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';

import {formatDate, getExcerpt} from '../utils';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.toEdit = this.toEdit.bind(this);
    this.toDetail = this.toDetail.bind(this);
  }

  toEdit(poemId) {
    this.props.redirectToEdit(poemId);
  }

  toDetail(poemId) {
    this.props.redirectToDetail(poemId);
  }

  render() {
    const {displayName, poems, isOwner} = this.props;
    return <div>
      <h3 class="Fz(24px)">
        {displayName}
      </h3>
      <div class="Fz(12px) C(gray)">
        <Link class="Mx(6px) Cur(p) Td(u):h C(gray)" to="/me">poems</Link>
        <Link class="Mx(6px) Cur(p) Td(u):h C(gray)" to="/me/following">following</Link>
        <Link class="Mx(6px) Cur(p) Td(u):h C(gray)" to="/me/follower">follower</Link>
      </div>
      <div>

        {poems.map((poem) => <Poem key={poem._id} id={poem._id} author={displayName} align={poem.align} title={poem.title}
          body={poem.body} visibility={poem.visibility} lastEditDate={formatDate(poem.lastEditDate)}
          viewCount={poem.viewCount} likeCount={poem.likeCount} commentCount={poem.commentCount}
          preview={getExcerpt(poem.body)} isOwner={isOwner} toEdit={this.toEdit} toDetail={this.toDetail}
        />)}

      </div>
    </div>;
  }
}
