import React from 'react';
import PoemInfo from './PoemInfo';
import {Link} from 'react-router-dom';
import {formatDateTime, UNAUTHORIZED} from '../utils';
import {getAlignStyle} from '../utils';

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
    };
    this.redirectToEdit = this.redirectToEdit.bind(this);
  }

  async componentDidMount() {
    const poem = await this.app.poemDetail({poemId: this.props.match.params.poemId, token: this.app.state.token});
    console.log(poem);
    if (poem) {
      this.setState(poem.payload);
    }
  }

  redirectToEdit() {
    this.app.history.push(`/poems/${this.state._id}/edit`);
  }

  render() {
    const isLoggedIn = this.app.state.token;
    if (!isLoggedIn) {
      return <div>
        {UNAUTHORIZED}
      </div>;
    }

    const {align, title, body, visibility, likeCount, viewCount, commentCount} = this.state;
    const writtenDateFormatted = formatDateTime(this.state.writtenDate);
    const displayName = this.app.state.user ? this.app.state.user.displayName : '';

    return <div class="My(50px) Maw(500px) Mx(a)">
      <div>

        <div class={getAlignStyle(align)}>
          <span class="Bgc(lightgray) D(ib) Px(4px) Py(0) Fz(10px) Bdrs(2px) Mend(10px)">{visibility}</span>
          <button class="Bgc(black) C(white) Py(0) Bdw(0) Fz(10px) Bdrs(2px) Td(u):h" onClick={this.redirectToEdit}>
            edit
          </button>
        </div>
        <div class={getAlignStyle(align)}>
          <span class="C(gray) Fz(8px)">{writtenDateFormatted}</span>
        </div>
        <h3 class={`Fz(24px) `+ getAlignStyle(align)}>
          {title}
        </h3>
        <p class={`Whs(pw) `+ getAlignStyle(align)}>
          {body}
        </p>

        <PoemInfo author={displayName} likeCount={likeCount} viewCount={viewCount} commentCount={commentCount} poemId={this.state._id} app={this.app}/>
      </div>
    </div>;
  }
}
