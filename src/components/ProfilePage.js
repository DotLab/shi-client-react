import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';

import {formatDate, short} from '../utils';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
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

        {poems.map((poem) => <Poem key={poem._id} id={poem._id} author={displayName} title={poem.title}
          body={poem.body} privacy={poem.privacy} lastEditDate={formatDate(poem.lastEditDate)}
          viewCount={poem.viewCount} likeCount={poem.likeCount} commentCount={poem.commentCount} preview={short(poem.body)} isOwner={isOwner}
        />)}

      </div>
    </div>;
  }
}
