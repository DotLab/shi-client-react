import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';


import {formatDate, short} from '../utils';
import queryString from 'query-string';

const POEM_1 = `C8H10N4O2  so  softly  calling
Feel  my  energy  level  falling
I­t  faintly  whispers  my name (psss)
But now I'm just stuck stalling     (uh)
I  try but just can't break  free        (so)
"How about some herbal tea?"     (no)
Your  suggestion  is  appalling  (ugh)
But  coffee?  I'm  al­ways  keen
Need that daily hit of caffeine`;

const POEM_1_SHORT = `C8H10N4O2  so  softly  calling
Feel  my  energy  level  falling
I­t  faintly  whispers  my name (psss)
But now I'm just stuck stalling     (uh)`;

const POEM_2 = `everyday will be a new reason
to cry over you
everyday will also be a new reason
to love you
and as long as each day comes,
i'll cry but i'll love you
as if it will be my last`;

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
