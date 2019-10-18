import React from 'react';
import {STYLE_CONTROL_INPUT} from './styles';

const TEXT_ALIGN_START = 'TEXT_ALIGN_START';
const TEXT_ALIGN_CENTER = 'TEXT_ALIGN_CENTER';
const TEXT_ALIGN_END = 'TEXT_ALIGN_END';

function getAlignStyle(textAlign) {
  switch (textAlign) {
    case TEXT_ALIGN_START: return 'Ta(s)';
    case TEXT_ALIGN_CENTER: return 'Ta(c)';
    case TEXT_ALIGN_END: return 'Ta(e)';
  }
}


export default class PoemEditorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      align: TEXT_ALIGN_START,
    };
  }
  setAlign(textAlign) {
    this.setState({align: textAlign});
  }

  render() {
    const {align} = this.state;
    console.log(align);

    return <div>
      <div class="Maw(600px) Ta(s) Bgc(whitesmoke) Mih(500px) Bdrs($bdrs-panel) P($p-panel) Mx(a)">
        <div>
          <select class="Bgc(white) P(4px) Bdrs($bdrs-control) Bdc(t)">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <span className="Fl(end) Fz(20px) C($gray-500)">
            <span class={'Px(6px) Cur(p) ' + (align === TEXT_ALIGN_START ? 'C(skyblue)' : '')} onClick={() => this.setAlign(TEXT_ALIGN_START)}><i class="fas fa-align-left"></i></span>
            <span class={'Px(6px) Cur(p) ' + (align === TEXT_ALIGN_CENTER ? 'C(skyblue)' : '')} onClick={() => this.setAlign(TEXT_ALIGN_CENTER)}><i class="fas fa-align-center"></i></span>
            <span class={'Px(6px) Cur(p) ' + (align === TEXT_ALIGN_END ? 'C(skyblue)' : '')} onClick={() => this.setAlign(TEXT_ALIGN_END)}><i class="fas fa-align-right"></i></span>
          </span>
        </div>
        <div class="Mt($m-control)">
          <input class={STYLE_CONTROL_INPUT + getAlignStyle(align)} placeholder="Title..."/>
        </div>
        <div class="Mt($m-control)">
          <textarea class={'Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdc(t) ' + getAlignStyle(align)} placeholder="Poem..." rows="20"/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYLE_CONTROL_INPUT} placeholder="Tags..."/>
        </div>
        <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)">Save</button>

      </div>
    </div>;
  }
}
