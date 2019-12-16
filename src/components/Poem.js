import React from 'react';
import PoemInfo from './PoemInfo';
import {getAlignStyle} from '../utils';
import {Link} from 'react-router-dom';

export default class Poem extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      isExpanded: false,
      authorName: this.props.authorName,
      authorUserName: this.props.authorUserName,
    };
    this.expand=this.expand.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  async componentDidMount() {
    if (this.props.authorName) return;
    const poet = await this.app.poetDetail({userId: this.props.authorId});
    this.setState({authorName: poet.displayName, authorUserName: poet.userName});
  }

  expand() {
    this.setState({isExpanded: true});
    this.props.toVisit(this.props.id);
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

  render() {
    const {id, authorId, align, title, body, preview,
      lastEditDate, isOwner, visibility, viewCount, likeCount, commentCount, isFollowing, liked} = this.props;
    const {isExpanded, authorName, authorUserName} = this.state;

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
        follow={this.follow} unfollow={this.unfollow}
      />
    </div>;
  }
}
