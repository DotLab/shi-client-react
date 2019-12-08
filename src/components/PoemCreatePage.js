import React from 'react';
import {STYLE_CONTROL_INPUT} from './styles';
import {onChange, UNAUTHORIZED} from '../utils';
import {getAlignStyle, TEXT_ALIGN_START, TEXT_ALIGN_CENTER, TEXT_ALIGN_END} from '../utils';

export default class PoemCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      align: TEXT_ALIGN_START,
      visibility: 'public',
      title: '',
      body: '',
    };

    this.onChange = onChange.bind(this);
    this.createPoem = this.createPoem.bind(this);
  }

  setAlign(textAlign) {
    this.setState({align: textAlign});
  }

  createPoem(e) {
    e.preventDefault();
    this.app.userCreatePoem({...this.state, token: this.app.state.token});
  }

  render() {
    const {align} = this.state;
    const isLoggedIn = this.app.state.token;
    if (!isLoggedIn) {
      return <div>
        {UNAUTHORIZED}
      </div>;
    }

    return <div>
      <div class="Maw(600px) Ta(s) Bgc(whitesmoke) Mih(500px) Bdrs($bdrs-panel) P($p-panel) Mx(a)">
        <div>
          <select class="Bgc(white) P(4px) Bdrs($bdrs-control) Bdc(t)" name="visibility" onChange={this.onChange} value={this.state.visibility}>
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
          <input class={STYLE_CONTROL_INPUT + getAlignStyle(align)} placeholder="Title..." onChange={this.onChange} name="title" />
        </div>
        <div class="Mt($m-control)">
          <textarea class={'Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdc(t) ' + getAlignStyle(align)} placeholder="Poem..." rows="20"
            onChange={this.onChange} name="body"/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYLE_CONTROL_INPUT} placeholder="Tags..."/>
        </div>
        <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.createPoem}>Publish</button>
      </div>
    </div>;
  }
}
