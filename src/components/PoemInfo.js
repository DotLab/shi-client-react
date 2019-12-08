import React from 'react';

export default class PoemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      likeFlag: false,
      likeCount: this.props.likeCount,
      viewCount: this.props.viewCount,
      commentCount: this.props.commentCount,
    };

    this.likePoem = this.likePoem.bind(this);
  }

  async likePoem(e) {
    e.preventDefault();
    if (!this.state.likeFlag) {
      try {
        await this.app.poemLike({poemId: this.props.poemId, token: this.app.state.token});
        this.setState({likeCount: this.state.likeCount + 1, likeFlag: true});
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await this.app.poemUnlike({poemId: this.props.poemId, token: this.app.state.token});
        this.setState({likeCount: this.state.likeCount - 1, likeFlag: false});
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const {author, isOwner} = this.props;
    const {likeCount, commentCount} = this.state;

    return <div>

      <div class="Mih(100px) Miw(500px) Bgc(whitesmoke) D(ib) P(10px) Bdrs($bdrs-panel)">
        <div class="Ta(s)">
          <img class="Bdrs(100%) Mend(16px)" src="https://hellopoetry.s3.amazonaws.com/static/cache/3c/06/3c06fe65b732452ef83554385e05d5d6.jpg" alt=""/>
          <div class="D(ib) Va(m) Fz(12px) C(gray)">
             Written by <br/><span class="Fz(16px) C(darkred) Td(u):h">{author}</span>
          </div>
          {!isOwner &&
            <span class="Fl(end) Bgc(lightgray) Bgc(darkred):h C(white):h Px(8px) Py(2px) Mt(10px) Mend(8px) Fz(12px) Bdrs($bdrs-control)">Follow</span>
          }
        </div>

        <div class="D(f) My(12px)">
          <textarea class="D(b) Bdrs($bdrs-panel) Bdc(t) W(100%)" placeholder="Add a comment..."/>
        </div>

        <div class="Fz(14px) My(12px) Cf">
          <span className="Cur(p) Fl(start) ">
            <span class="Mend(10px)"><i class="far fa-heart"></i></span>
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
