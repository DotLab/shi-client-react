import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';

import {onChange, pushHistory} from '../utils';
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

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  componentWillReceiveProps(newProps) {

  }

  render() {
    const loggedin = this.app.state.token;
    if (!loggedin) {
      return <div>
        403
      </div>;
    }
    const displayName = this.app.state.user.displayName;

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
        <Poem shouldShowEditButton visibility="public" hotness="723" author="MicMag" title="Coffee" date="23h" body={POEM_1} preview={POEM_1_SHORT} />
        <Poem shouldShowEditButton visibility="public" hotness="530" author="last rainy night"
          title="even if it's the last thing i do" date="1w" body={POEM_2} />
      </div>
    </div>;
  }
}

