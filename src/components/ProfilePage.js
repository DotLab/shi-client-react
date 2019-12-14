import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';

import {formatDate, getExcerpt} from '../utils';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.toVisit = this.toVisit.bind(this);
  }

  toVisit(poemId) {
    this.props.visitPoem(poemId);
  }

  render() {
    const {displayName, userName, poems, isOwner, isFollowing} = this.props;
    return <div>
      <h3 class="Fz(24px)">
        {displayName}
      </h3>
      <div class="Fz(12px) C(gray)">
        <Link to={{pathname: `/poets/${userName}`}} class="Mx(6px) Cur(p) Td(u) C(gray)">poems</Link>
        <Link to={{pathname: `/poets/${userName}/following`}} class="Mx(6px) Cur(p) Td(u):h C(gray)">following</Link>
        <Link to={{pathname: `/poets/${userName}/follower`}} class="Mx(6px) Cur(p) Td(u):h C(gray)">follower</Link>
      </div>
      <div>

        {poems.map((poem) => <Poem key={poem._id} id={poem._id} authorId={poem.authorId} authorName={displayName}
          align={poem.align} title={poem.title} body={poem.body} visibility={poem.visibility}
          lastEditDate={formatDate(poem.lastEditDate)} viewCount={poem.viewCount} likeCount={poem.likeCount}
          commentCount={poem.commentCount} preview={getExcerpt(poem.body)} isOwner={isOwner}
          toVisit={this.toVisit} isFollowing={isFollowing}
        />)}

      </div>
    </div>;
  }
}
