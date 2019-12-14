import React from 'react';
import PoemInfo from './PoemInfo';
import {getAlignStyle} from '../utils';
import {Link} from 'react-router-dom';

export default class Poem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
    this.expand=this.expand.bind(this);
  }

  expand() {
    this.setState({isExpanded: true});
  }

  render() {
    const {author, align, title, body, preview, lastEditDate, isOwner, visibility, viewCount, likeCount, commentCount} = this.props;
    const {isExpanded} = this.state;

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
        {!isOwner && <span> {author} • </span>}
        <span>{lastEditDate}</span>
      </div>
      <Link to={{pathname: `/poems/${this.props.id}`}} class={`Fz(24px) Cur(p):h D(b) C(black) `+ getAlignStyle(align)}>{title}</Link>
      <p class={`Whs(pw) `+ getAlignStyle(align)}>
        {!isExpanded ? (preview || body) : body}
      </p>
      {!isExpanded &&
         <span class="Cur(p) C(skyblue) Td(u):h" onClick={this.expand}>Continue reading...</span>}
      <PoemInfo author={author} likeCount={likeCount} commentCount={commentCount} isOwner={isOwner}/>
    </div>;
  }
}
