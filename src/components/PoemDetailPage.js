import React from 'react';
import PoemInfo from './PoemInfo';
import Comment from './Comment';
import {Link} from 'react-router-dom';
import {formatDateTime, DETAIL_COMMENT_LIMIT} from '../utils';
import {getAlignStyle, pushHistory} from '../utils';

export default class PoemDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      _id: null,
      authorId: null,
      title: '',
      body: '',
      writtenDate: null,
      lastEditDate: null,
      visibility: '',
      align: '',
      likeCount: 0,
      viewCount: 0,
      commentCount: 0,
      authorName: null,
      authorUserName: null,
      isFollowing: false,
      liked: false,
      comments: [],
    };
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.comment = this.comment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async componentDidMount() {
    const poem = await this.app.poemDetail({poemId: this.props.match.params.poemId, token: this.app.state.token});
    this.setState(poem);

    const poet = await this.app.poetDetail({userId: this.state.authorId});
    this.setState({authorName: poet.displayName, authorUserName: poet.userName});

    if (!this.app.state.token) return;
    const isFollowing = await this.app.followingStatus({token: this.app.state.token, userIds: [this.state.authorId]});
    const liked = await this.app.likeStatus({token: this.app.state.token, poemIds: [this.props.match.params.poemId]});
    const comments = await this.app.commentList({poemId: this.props.match.params.poemId, token: this.app.state.token, limit: DETAIL_COMMENT_LIMIT});
    this.setState({isFollowing: isFollowing[0], liked: liked[0], comments: comments});
  }

  async like() {
    if (!this.app.state.token) return;
    await this.app.poemLike({poemId: this.state._id, token: this.app.state.token});
    const poem = await this.app.poemDetail({poemId: this.props.match.params.poemId, token: this.app.state.token});
    this.setState({likeCount: poem.likeCount, liked: true});
  }

  async unlike() {
    if (!this.app.state.token) return;
    await this.app.poemUnlike({poemId: this.state._id, token: this.app.state.token});
    const poem = await this.app.poemDetail({poemId: this.props.match.params.poemId, token: this.app.state.token});
    this.setState({likeCount: poem.likeCount, liked: false});
  }

  async follow() {
    if (!this.app.state.token) return;
    await this.app.userFollowUser({followId: this.state.authorId, token: this.app.state.token});
    const follow = await this.app.followingStatus({userIds: [this.state.authorId], token: this.app.state.token});
    this.setState({isFollowing: follow[0]});
  }

  async unfollow() {
    if (!this.app.state.token) return;
    await this.app.userUnfollowUser({unfollowId: this.state.authorId, token: this.app.state.token});
    const follow = await this.app.followingStatus({userIds: [this.state.authorId], token: this.app.state.token});
    this.setState({isFollowing: follow[0]});
  }

  async comment(comment) {
    this.app.comment({poemId: this.state._id, token: this.app.state.token, comment: comment});
    const comments = await this.app.commentList({poemId: this.props.match.params.poemId, token: this.app.state.token, limit: DETAIL_COMMENT_LIMIT});
    this.setState({comments: comments, commentCount: comments.length});
  }

  async deleteComment(commentId) {
    this.app.commentDelete({token: this.app.state.token, commentId: commentId});
    const comments = await this.app.commentList({poemId: this.props.match.params.poemId, token: this.app.state.token, limit: DETAIL_COMMENT_LIMIT});
    this.setState({comments: comments, commentCount: comments.length});
  }

  render() {
    const {align, title, body, visibility, likeCount, viewCount,
      commentCount, authorName, authorUserName, authorId, isFollowing, liked, comments} = this.state;
    const writtenDateFormatted = formatDateTime(this.state.writtenDate);
    let isOwner = true;
    if (!this.app.state.user || this.state.authorId !== this.app.state.user._id) {
      isOwner = false;
    }

    return <div class="My(50px) Maw(500px) Mx(a)">
      <div>
        <div class={getAlignStyle(align)}>
          <span class="Bgc(lightgray) D(ib) Px(4px) Py(0) Fz(10px) Bdrs(2px) Mend(10px)">{visibility}</span>
          {isOwner &&
            <Link to={{pathname: `/poems/${this.state._id}/edit`}} class="Bgc(black) C(white) Py(0) Bdw(0) Fz(10px) Px(4px) Bdrs(2px) Td(u):h">
              edit</Link>}
        </div>
        <div class={getAlignStyle(align)}>
          <span class="C(gray) Fz(8px)">{writtenDateFormatted}</span>
        </div>
        <h3 class={`Fz(24px) `+ getAlignStyle(align)}>{title}</h3>
        <p class={`Whs(pw) `+ getAlignStyle(align)}>{body}</p>

        <PoemInfo authorName={authorName} authorId={authorId} userName={authorUserName}
          isFollowing={isFollowing} liked={liked} likeCount={likeCount}
          viewCount={viewCount} commentCount={commentCount}
          poemId={this.state._id}
          like={this.like} unlike={this.unlike}
          follow={this.follow} unfollow={this.unfollow} comment={this.comment}
        />
        <div>
          {comments.map((comment) => <Comment key={comment._id} id={comment._id} body={comment.body}
            commentAuthorId={comment.commentAuthorId} date={formatDateTime(comment.date)}
            deleteComment={this.deleteComment} isOwner={comment.isOwner}
            commentAuthorName={comment.commentAuthorName}
            commentAuthorUserName={comment.commentAuthorUserName}/>)}
        </div>
      </div>
    </div>;
  }
}
