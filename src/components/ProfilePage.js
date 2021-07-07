import React from 'react';
import Poem from './Poem';
import {Link} from 'react-router-dom';
import {formatDate, getExcerpt} from '../utils';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.toVisit = this.toVisit.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.comment = this.comment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
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

  async comment(body, poemId) {
    await this.props.comment(body, poemId);
  }

  async deleteComment(commentId) {
    await this.props.deleteComment(commentId);
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
        {poems.map((poem) => <Poem key={poem._id} id={poem._id}
          authorId={poem.authorId} authorName={displayName} userName={userName}
          align={poem.align} title={poem.title} body={poem.body} visibility={poem.visibility}
          lastEditDate={formatDate(poem.lastEditDate)} viewCount={poem.viewCount} likeCount={poem.likeCount}
          commentCount={poem.commentCount} preview={getExcerpt(poem.body)} isOwner={isOwner}
          toVisit={this.toVisit} isFollowing={isFollowing} liked={poem.liked}
          like={this.like} unlike={this.unlike}
          follow={this.props.follow} unfollow={this.props.unfollow} app={this.app}
          comment={this.comment} deleteComment={this.deleteComment}
        />)}
      </div>
    </div>;
  }
}
