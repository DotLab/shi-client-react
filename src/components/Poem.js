import React from 'react';
import PoemInfo from './PoemInfo';
import {getAlignStyle} from '../utils';

export default class Poem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
    this.expand=this.expand.bind(this);
    this.edit = this.edit.bind(this);
    this.detail = this.detail.bind(this);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
  }

  expand() {
    this.setState({isExpanded: true});
    this.props.toVisit(this.props.id);
  }

  edit() {
    this.props.toEdit(this.props.id);
  }

  detail() {
    this.props.toDetail(this.props.id);
  }

  redirectToUserProfile() {
    this.props.redirectToUserProfile();
  }

  render() {
    const {id, authorId, authorName, align, title, body, preview,
      lastEditDate, isOwner, visibility, viewCount, likeCount, commentCount, isFollowing} = this.props;
    const {isExpanded} = this.state;

    return <div class="My(50px) Maw(500px) Mx(a)">
      <div class="C(lightgrey) Fz(14dpx)">
        <i class="fas fa-fire"></i> {viewCount}°
      </div>
      <div class={getAlignStyle(align)}>
        {isOwner &&
        <span class="Bgc(lightgray) D(ib) Px(4px) Py(0) Fz(10px) Bdrs(2px) Mend(10px)">{visibility}</span>}

        {isOwner &&
         <button class="Bgc(black) C(white) Py(0) Bdw(0) Fz(10px) Bdrs(2px)" onClick={this.edit}>edit</button>}
      </div>
      <div class={getAlignStyle(align)}>
        {!isOwner && <span> {authorName} • </span>}
        <span>{lastEditDate}</span>
      </div>
      <h3 class={`Fz(24px) Cur(p):h `+ getAlignStyle(align)} onClick={this.detail}>
        {title}
      </h3>
      <p class={`Whs(pw) `+ getAlignStyle(align)}>
        {!isExpanded ? (preview || body) : body}
      </p>
      {!isExpanded &&
         <span class="Cur(p) C(skyblue) Td(u):h" onClick={this.expand}>Continue reading...</span>}
      <PoemInfo authorId={authorId} authorName={authorName} likeCount={likeCount} id={id}
        commentCount={commentCount} isOwner={isOwner} isFollowing={isFollowing}
        redirectToUserProfile={this.redirectToUserProfile}
      />
    </div>;
  }
}
