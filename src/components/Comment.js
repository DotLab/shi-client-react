import React from 'react';
import {Link} from 'react-router-dom';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.delete = this.delete.bind(this);
  }

  delete(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.id);
  }

  render() {
    const {date, body, commentAuthorName, isOwner, commentAuthorUserName} = this.props;

    return <div>
      <div class="Mih(100px) Miw(500px) Maw(500px) Bgc(whitesmoke) D(ib) P(10px) Bdrs($bdrs-panel)">
        <div class="Ta(s) D(f)">
          <img class="Bdrs(100%) Mend(16px) H(fc)" src="https://hellopoetry.s3.amazonaws.com/static/cache/3c/06/3c06fe65b732452ef83554385e05d5d6.jpg" alt=""/>
          <div class="D(ib) Fz(12px) Va(t) C(gray)">
            <Link to={{pathname: `/poets/${commentAuthorUserName}`}} class="Fz(16px) C(darkred) Mend(8px) Td(u):h">{commentAuthorName}</Link>
            <p class="Wob(ba)">{body}</p>
            <div>
              <span>{date}</span>
            </div>
          </div>
          {isOwner &&
            <span class="Mstart(a) Fz(14px) Cur(p):h C(darkred):h" onClick={this.delete}><i class="fas fa-trash-alt"></i></span>}
        </div>
      </div>
    </div>;
  }
}
