import React from 'react';
import ProfilePage from './ProfilePage';
import {Link} from 'react-router-dom';

import {onChange, pushHistory, UNAUTHORIZED} from '../utils';
import queryString from 'query-string';
import ProfilePage from './ProfilePage';

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
  }

  async componentDidMount() {
    try {
      await this.app.userDetail({token: this.app.state.token});
      this.setState(this.app.state.user);
      const poems = await this.app.userPoem({token: this.app.state.token});
      if (poems) {
        this.setState({poems: poems.payload});
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const isLoggedIn = this.app.state.token;
    if (!isLoggedIn) {
      return <div>
        {UNAUTHORIZED}
      </div>;
    }

    const {displayName} = this.state;

    return <div>
      <ProfilePage displayName={displayName} poems={poems} isOwner={true}/>
    </div>;
  }
}
