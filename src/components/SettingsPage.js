import React from 'react';
import {Link} from 'react-router-dom';
import {STYLE_CONTROL_INPUT} from './styles';

export default class SettingsPage extends React.Component {
  render() {
    const {username, name} = this.props;
    return <div>
      <h2 class="Fz(24px)">Settings</h2>

      <div class="Maw(500px) Mx(a) Bgc(whitesmoke) P($p-panel) Mt(20px) Bdrs($bdrs-control) Ta(s)">
        <div>
          <div class="Fz(12px) Fw(b) C(dimgray)">PROFILE PHOTO</div>
          <div class="Bgc(white) Mt(2px) H(44px) Bdrs($bdrs-control)">
            <input class="Py(8px) Fl(start) Px(12px)" type="file" name="name" />
          </div>
          <div class="C(darkgray) Fz(12px) Mt(4px)">Mininum size is 300x300</div>
        </div>

        <div class="Mt($m-control)">
          <div class="Fz(12px) Fw(b) C(dimgray)">COVER PHOTO</div>
          <div class="Bgc(white) Mt(2px) H(44px) Bdrs($bdrs-control)">
            <input class="Py(8px) Fl(start) Px(12px)" type="file" name="name" />
          </div>
          <div class="C(darkgray) Fz(12px) Mt(4px)">Mininum size is 400x800</div>
        </div>

        <div class="Mt($m-control)">
          <div>
            <span class="Fz(12px) Fw(b) C(dimgray)">USERNAME</span>
            <span class="Fz(14px) Fl(end) Fs(n)">{username}</span>
          </div>
          <input class={STYLE_CONTROL_INPUT} value={username} disabled/>
        </div>

        <div class="Mt($m-control)">
          <div class="D(b) Fz(12px) Fw(b) C(dimgray)">NAME</div>
          <input class={STYLE_CONTROL_INPUT} value={name} disabled/>
        </div>
        <div>
          <Link class="Fz(14px) C(darkred) Td(u):h" to='/settings/password'>Change Password</Link>
        </div>
      </div>
    </div>;
  }
}

