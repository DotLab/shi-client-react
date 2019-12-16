import React from 'react';
import PoemInfo from './PoemInfo';
import Comment from './Comment';
import {getAlignStyle, formatDateTime, HOME_COMMENT_LIMIT} from '../utils';
import {Link} from 'react-router-dom';

export default class Poem extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      isExpanded: false,
      authorName: this.props.authorName,
      authorUserName: this.props.authorUserName,
      comments: [],
    };
    this.expand=this.expand.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.comment = this.comment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async componentDidMount() {
    if (this.props.authorName) return;
    const poet = await this.app.poetDetail({userId: this.props.authorId});
    this.setState({authorName: poet.displayName, authorUserName: poet.userName});

    if (!this.app.state.token) return;
    const comments = await this.app.commentList({poemId: this.props.id, token: this.app.state.token, limit: HOME_COMMENT_LIMIT});
    this.setState({authorName: poet.displayName, authorUserName: poet.userName, comments: comments});
  }

  async expand() {
    this.setState({isExpanded: true});
    this.props.toVisit(this.props.id);
    if (this.app.state.token !== null) {
      const comments = await this.app.commentList({poemId: this.props.id, token: this.app.state.token, limit: HOME_COMMENT_LIMIT});
      this.setState({comments: comments, commentCount: comments.length});
    }
  }

  async like() {
    await this.props.like(this.props.id);
  }

  async unlike() {
    await this.props.unlike(this.props.id);
  }

  async follow() {
    await this.props.follow(this.props.authorId);
  }

  async unfollow() {
    await this.props.unfollow(this.props.authorId);
  }

  async comment(body) {
    if (this.app.state.token !== null) {
      await this.props.comment(body, this.props.id);
      const comments = await this.app.commentList({poemId: this.props.id, token: this.app.state.token, limit: HOME_COMMENT_LIMIT});
      this.setState({comments: comments, commentCount: comments.length});
    }
  }

  async deleteComment(commentId) {
    if (this.app.state.token !== null) {
      await this.props.deleteComment(commentId);
      const comments = await this.app.commentList({poemId: this.props.id, token: this.app.state.token, limit: HOME_COMMENT_LIMIT});
      this.setState({comments: comments, commentCount: comments.length});
    }
  }

  render() {
    const {id, authorId, align, title, body, preview,
      lastEditDate, isOwner, visibility, viewCount, likeCount, commentCount, isFollowing, liked} = this.props;
    const {isExpanded, authorName, authorUserName, comments} = this.state;

    return <div class="My(50px) Maw(500px) Mx(a)">
      <div class="C(lightgrey) Fz(14dpx)">
        <i class="fas fa-fire"></i> {viewCount}°
      </div>
      <div class={getAlignStyle(align)}>
        {isOwner &&
          <span class="Bgc(lightgray) D(ib) Px(4px) Py(0) Fz(10px) Bdrs(2px) Mend(10px)">{visibility}</span>}
        {isOwner &&
          <Link to={{pathname: `/poems/${this.props.id}/edit`}} class="Bgc(black) C(white) Py(0) Bdw(0) Fz(10px) Bdrs(2px) Px(4px)">edit</Link>}
      </div>

      <div class={getAlignStyle(align)}>
        {!isOwner && <span> {authorName} • </span>}
        <span>{lastEditDate}</span>
      </div>
      <Link to={{pathname: `/poems/${this.props.id}`}} class={`Fz(24px) Cur(p):h D(b) C(black) `+ getAlignStyle(align)}>{title}</Link>
      <p class={`Whs(pw) `+ getAlignStyle(align)}>
        {!isExpanded ? (preview || body) : body}
      </p>
      {!isExpanded &&
         <span class="Cur(p) C(skyblue) Td(u):h" onClick={this.expand}>Continue reading...</span>}
      <PoemInfo authorId={authorId} userName={authorUserName} authorName={authorName} likeCount={likeCount} id={id} app={this.app}
        commentCount={commentCount} isOwner={isOwner} isFollowing={isFollowing} liked={liked}
        like={this.like} unlike={this.unlike}
        follow={this.follow} unfollow={this.unfollow} comment={this.comment}
      />}

      {isExpanded && <div>
        {comments.map((comment) => <Comment key={comment._id} id={comment._id} body={comment.body}
          commentAuthorId={comment.commentAuthorId} date={formatDateTime(comment.date)}
          deleteComment={this.deleteComment} isOwner={comment.isOwner}
          commentAuthorName={comment.commentAuthorName}/>)}
      </div>}
    </div>;
  }
}
