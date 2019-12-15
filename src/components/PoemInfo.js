import React from 'react';
import {Link} from 'react-router-dom';

export default class PoemInfo extends React.Component {
  constructor(props) {
    super(props);

    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  async like(e) {
    e.preventDefault();
    await this.props.like();
  }

  async unlike(e) {
    e.preventDefault();
    await this.props.unlike();
  }

  async follow(e) {
    e.preventDefault();
    await this.props.follow();
  }

  async unfollow(e) {
    e.preventDefault();
    await this.props.unfollow();
  }

  render() {
    const {authorName, userName, isFollowing, liked, likeCount, commentCount} = this.props;

    return <div>
      <div class="Mih(100px) Miw(500px) Bgc(whitesmoke) D(ib) P(10px) Bdrs($bdrs-panel)">
        <div class="Ta(s)">
          <img class="Bdrs(100%) Mend(16px)" src="https://hellopoetry.s3.amazonaws.com/static/cache/3c/06/3c06fe65b732452ef83554385e05d5d6.jpg" alt=""/>
          <div class="D(ib) Va(m) Fz(12px) C(gray)">
             Written by <br/>
            <Link to={{pathname: `/poets/${userName}`}} class="Fz(16px) C(darkred) Td(u):h">{authorName}</Link>
          </div>
          {!isFollowing &&
            <button class="Fl(end) Bdc(t) Bgc(lightgray) Bgc(darkred):h C(white):h Px(8px) Py(2px) Mt(10px) Mend(8px) Fz(12px) W(80px) Bdrs($bdrs-control) Cur(p):h"
              onClick={this.follow}>Follow</button>
          }
          {isFollowing &&
            <button class="Fl(end) Bdc(t) Bgc(darkred) Bgc(lightgray):h C(white) Px(8px) Py(2px) Mt(10px) Mend(8px) Fz(12px) W(80px) Bdrs($bdrs-control) Cur(p):h"
              onClick={this.unfollow}>Following</button>
          }

        </div>

        <div class="D(f) My(12px)">
          <textarea class="D(b) Bdrs($bdrs-panel) Bdc(t) W(100%)" placeholder="Add a comment..."/>
        </div>

        <div class="Fz(14px) My(12px) Cf">
          <span className="Cur(p) Fl(start) ">
            {!liked && <span class="Mend(10px)" onClick={this.like}><i class="far fa-heart"></i></span>}
            {liked && <span class="Mend(10px)" onClick={this.unlike}><i class="fas fa-heart"></i></span>}
            <span class="Td(u):h">{likeCount}</span>
          </span>
        </div>

        <div class="Fl(start) Mx(8px) Fz(14px)">
          {commentCount} comment
        </div>
      </div>
    </div>;
  }
}
