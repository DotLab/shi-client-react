import React from 'react';
import {Link} from 'react-router-dom';
import {STYLE_CONTROL_INPUT} from './styles';
import {onChange, TEXT_ALIGN_CENTER, TEXT_ALIGN_END, TEXT_ALIGN_START, getAlignStyle} from '../utils';


export default class PoemEditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      _id: null,
      author: null,
      title: '',
      body: '',
      writtenDate: null,
      lastEditDate: null,
      privacy: '',
      align: '',
      likeCount: 0,
      viewCount: 0,
      commentCount: 0,
    };

    this.onChange = onChange.bind(this);
    this.poemEdit = this.poemEdit.bind(this);
    this.poemDelete = this.poemDelete.bind(this);
  }

  setAlign(textAlign) {
    this.setState({align: textAlign});
  }

  poemEdit(e) {
    e.preventDefault();
    this.app.poemEdit({poemId: this.state._id, title: this.state.title,
      body: this.state.body, privacy: this.state.privacy,
      align: this.state.align, token: this.app.state.token});
  }

  poemDelete(e) {
    e.preventDefault();
    this.app.poemDelete({poemId: this.state._id, token: this.app.state.token});
  }

  async componentDidMount() {
    const poem = await this.app.poemDetail({poemId: this.props.match.params.poemId, token: this.app.state.token});
    console.log(poem);
    if (poem) {
      this.setState(poem.payload);
    }
  }

  render() {
    const {align, title, body, privacy} = this.state;
    console.log(align);

    return <div>
      <div class="Maw(600px) Ta(s) Bgc(whitesmoke) Mih(500px) Bdrs($bdrs-panel) P($p-panel) Mx(a)">
        <div>
          <select class="Bgc(white) P(4px) Bdrs($bdrs-control) Bdc(t)" name="privacy" value={privacy} onChange={this.onChange}>
            <option value="public">Public</option>
            <option value="community">Community</option>
            <option value="private">Private</option>
          </select>
          <span className="Fl(end) Fz(20px) C($gray-500)">
            <span class={'Px(6px) Cur(p) ' + (align === TEXT_ALIGN_START ? 'C(skyblue)' : '')} onClick={() => this.setAlign(TEXT_ALIGN_START)}><i class="fas fa-align-left"></i></span>
            <span class={'Px(6px) Cur(p) ' + (align === TEXT_ALIGN_CENTER ? 'C(skyblue)' : '')} onClick={() => this.setAlign(TEXT_ALIGN_CENTER)}><i class="fas fa-align-center"></i></span>
            <span class={'Px(6px) Cur(p) ' + (align === TEXT_ALIGN_END ? 'C(skyblue)' : '')} onClick={() => this.setAlign(TEXT_ALIGN_END)}><i class="fas fa-align-right"></i></span>
          </span>
        </div>
        <div class="Mt($m-control)">
          <input class={STYLE_CONTROL_INPUT + getAlignStyle(align)} value={title} onChange={this.onChange} name="title"/>
        </div>
        <div class="Mt($m-control)">
          <textarea class={'Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdc(t) ' + getAlignStyle(align)}
            value={body} rows="20" onChange={this.onChange} name="body"/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYLE_CONTROL_INPUT} placeholder="Tags..."/>
        </div>
        <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.poemEdit}>Save</button>
        <div>
          <span class="Fz(14px) C(darkred) Td(u):h" onClick={this.poemDelete}>Delete Poem</span>
        </div>
      </div>
    </div>;
  }
}
